cmake_minimum_required(VERSION 3.10)
project(OCCTBindings)

# Set C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Emscripten-specific settings
if(EMSCRIPTEN)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s WASM=1 -s USE_PTHREADS=1")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s ALLOW_MEMORY_GROWTH=1 -s MAXIMUM_MEMORY=2GB")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s EXPORT_ES6=1 -s MODULARIZE=1")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s EXPORT_NAME='createOCCTModule'")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 --bind")

    # Linker flags
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -s WASM=1 -s USE_PTHREADS=1")
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -s ALLOW_MEMORY_GROWTH=1")
    set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} --bind")
endif()

# Find OCCT libraries (built previously)
set(OCCT_BUILD_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../build-occt)
set(OCCT_LIB_DIR ${OCCT_BUILD_DIR}/lin32/clang/lib)
set(OCCT_INC_DIR ${OCCT_BUILD_DIR}/include/opencascade)

# Check if OCCT build directory exists
if(NOT EXISTS ${OCCT_BUILD_DIR})
    message(FATAL_ERROR "OCCT build directory not found: ${OCCT_BUILD_DIR}")
endif()

if(NOT EXISTS ${OCCT_INC_DIR})
    message(FATAL_ERROR "OCCT include directory not found: ${OCCT_INC_DIR}")
endif()

# Include OCCT headers
include_directories(${OCCT_INC_DIR})

# Define OCCT libraries in dependency order
set(OCCT_LIBRARIES
    # Core libraries (must be first)
    ${OCCT_LIB_DIR}/libTKernel.a
    ${OCCT_LIB_DIR}/libTKMath.a

    # Geometry libraries
    ${OCCT_LIB_DIR}/libTKG2d.a
    ${OCCT_LIB_DIR}/libTKG3d.a
    ${OCCT_LIB_DIR}/libTKGeomBase.a
    ${OCCT_LIB_DIR}/libTKBRep.a
    ${OCCT_LIB_DIR}/libTKGeomAlgo.a

    # Topology libraries
    ${OCCT_LIB_DIR}/libTKTopAlgo.a
    ${OCCT_LIB_DIR}/libTKPrim.a

    # Boolean operations
    ${OCCT_LIB_DIR}/libTKBO.a
    ${OCCT_LIB_DIR}/libTKBool.a

    # Features
    ${OCCT_LIB_DIR}/libTKFillet.a
    ${OCCT_LIB_DIR}/libTKOffset.a
    ${OCCT_LIB_DIR}/libTKFeat.a

    # Mesh
    ${OCCT_LIB_DIR}/libTKMesh.a
    ${OCCT_LIB_DIR}/libTKXMesh.a

    # Healing
    ${OCCT_LIB_DIR}/libTKShHealing.a

    # Hidden Line Removal
    ${OCCT_LIB_DIR}/libTKHLR.a

    # Data Exchange
    ${OCCT_LIB_DIR}/libTKDE.a
    ${OCCT_LIB_DIR}/libTKXSBase.a
    ${OCCT_LIB_DIR}/libTKDESTEP.a
    ${OCCT_LIB_DIR}/libTKDESTL.a
    ${OCCT_LIB_DIR}/libTKDEIGES.a
    ${OCCT_LIB_DIR}/libTKDEVRML.a
    ${OCCT_LIB_DIR}/libTKRWMesh.a

    # CAF (Application Framework)
    ${OCCT_LIB_DIR}/libTKCDF.a
    ${OCCT_LIB_DIR}/libTKLCAF.a
    ${OCCT_LIB_DIR}/libTKCAF.a
    ${OCCT_LIB_DIR}/libTKXCAF.a

    # Persistence
    ${OCCT_LIB_DIR}/libTKBin.a
    ${OCCT_LIB_DIR}/libTKBinL.a
    ${OCCT_LIB_DIR}/libTKBinXCAF.a
    ${OCCT_LIB_DIR}/libTKXml.a
    ${OCCT_LIB_DIR}/libTKXmlL.a
    ${OCCT_LIB_DIR}/libTKXmlXCAF.a
    ${OCCT_LIB_DIR}/libTKStd.a
    ${OCCT_LIB_DIR}/libTKStdL.a

    # Other libraries
    ${OCCT_LIB_DIR}/libTKTObj.a
    ${OCCT_LIB_DIR}/libTKExpress.a
    ${OCCT_LIB_DIR}/libTKService.a
    ${OCCT_LIB_DIR}/libTKV3d.a
    ${OCCT_LIB_DIR}/libTKVCAF.a
    ${OCCT_LIB_DIR}/libTKDECascade.a
    ${OCCT_LIB_DIR}/libTKBinTObj.a
    ${OCCT_LIB_DIR}/libTKXmlTObj.a
    ${OCCT_LIB_DIR}/libTKDEOBJ.a
    ${OCCT_LIB_DIR}/libTKDEGLTF.a
    ${OCCT_LIB_DIR}/libTKDEPLY.a
)

# Create the executable
add_executable(occt_bindings occt_bindings.cpp)

# Link OCCT libraries
target_link_libraries(occt_bindings ${OCCT_LIBRARIES})

# Set output name to match expected naming
set_target_properties(occt_bindings PROPERTIES
    OUTPUT_NAME "occt_geometry"
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/../wasm
)

# For Emscripten, we need special handling
if(EMSCRIPTEN)
    # Ensure the output files go to the wasm directory
    set_target_properties(occt_bindings PROPERTIES
        SUFFIX ".js"
    )

    # Copy the .wasm file after build
    add_custom_command(TARGET occt_bindings POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy
        ${CMAKE_CURRENT_SOURCE_DIR}/../wasm/occt_geometry.wasm
        ${CMAKE_CURRENT_SOURCE_DIR}/../wasm/occt.wasm
        COMMENT "Copying WASM file to expected location"
    )

    add_custom_command(TARGET occt_bindings POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy
        ${CMAKE_CURRENT_SOURCE_DIR}/../wasm/occt_geometry.js
        ${CMAKE_CURRENT_SOURCE_DIR}/../wasm/occt.js
        COMMENT "Copying JS file to expected location"
    )
endif()