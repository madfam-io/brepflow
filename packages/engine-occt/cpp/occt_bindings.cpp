/**
 * OCCT WebAssembly Bindings - Fixed Version
 * C++ wrapper functions for real OCCT geometry operations
 */

#include <emscripten/bind.h>
#include <emscripten/val.h>

// OCCT Core Headers
#include <Standard_Handle.hxx>
#include <TopoDS_Shape.hxx>
#include <TopoDS_Solid.hxx>
#include <TopoDS_Face.hxx>
#include <TopoDS_Edge.hxx>
#include <TopoDS_Vertex.hxx>
#include <TopoDS.hxx>

// OCCT Primitive Builders
#include <BRepPrimAPI_MakeBox.hxx>
#include <BRepPrimAPI_MakeSphere.hxx>
#include <BRepPrimAPI_MakeCylinder.hxx>

// OCCT Boolean Operations
#include <BRepAlgoAPI_Fuse.hxx>
#include <BRepAlgoAPI_Cut.hxx>
#include <BRepAlgoAPI_Common.hxx>

// OCCT Tessellation
#include <BRepMesh_IncrementalMesh.hxx>
#include <TopExp_Explorer.hxx>
#include <BRep_Tool.hxx>
#include <Poly_Triangulation.hxx>
#include <TColgp_Array1OfPnt.hxx>
#include <Poly_Array1OfTriangle.hxx>
#include <TopLoc_Location.hxx>
#include <TopAbs_ShapeEnum.hxx>
#include <TopTools_ListOfShape.hxx>

// OCCT Bounding Box
#include <Bnd_Box.hxx>
#include <BRepBndLib.hxx>

// OCCT Geometry
#include <gp_Pnt.hxx>
#include <gp_Vec.hxx>
#include <gp_Ax2.hxx>
#include <gp_Dir.hxx>

// OCCT Feature Operations
#include <BRepFilletAPI_MakeFillet.hxx>
#include <BRepFilletAPI_MakeChamfer.hxx>
#include <BRepOffsetAPI_MakeThickSolid.hxx>
#include <BRepOffsetAPI_MakeDraft.hxx>

// OCCT File I/O
#include <STEPCAFControl_Reader.hxx>
#include <STEPCAFControl_Writer.hxx>
#include <StlAPI_Writer.hxx>
#include <TopTools_HSequenceOfShape.hxx>

// Standard Collections
#include <vector>
#include <string>
#include <map>
#include <memory>

using namespace emscripten;

/**
 * Shape Handle Manager
 * Manages OCCT TopoDS_Shape objects with unique IDs
 */
class ShapeManager {
private:
    static std::map<std::string, std::shared_ptr<TopoDS_Shape>> shapes_;
    static int nextId_;

public:
    static std::string storeShape(const TopoDS_Shape& shape) {
        std::string id = "shape_" + std::to_string(nextId_++);
        shapes_[id] = std::make_shared<TopoDS_Shape>(shape);
        return id;
    }

    static std::shared_ptr<TopoDS_Shape> getShape(const std::string& id) {
        auto it = shapes_.find(id);
        return (it != shapes_.end()) ? it->second : nullptr;
    }

    static void deleteShape(const std::string& id) {
        shapes_.erase(id);
    }

    static size_t getShapeCount() {
        return shapes_.size();
    }
};

// Static member definitions
std::map<std::string, std::shared_ptr<TopoDS_Shape>> ShapeManager::shapes_;
int ShapeManager::nextId_ = 1;

/**
 * Mesh Data Structure
 * Holds tessellated geometry data for WebGL rendering
 */
struct MeshData {
    std::vector<float> positions;
    std::vector<float> normals;
    std::vector<uint32_t> indices;
    std::vector<uint32_t> edges;

    MeshData() {}
};

/**
 * Shape Handle Structure
 * JavaScript-compatible shape reference
 */
struct ShapeHandle {
    std::string id;
    std::string type;
    float bbox_min_x, bbox_min_y, bbox_min_z;
    float bbox_max_x, bbox_max_y, bbox_max_z;
    std::string hash;

    // Default constructor for Emscripten
    ShapeHandle()
        : id(""), type("solid"),
          bbox_min_x(-50), bbox_min_y(-50), bbox_min_z(-50),
          bbox_max_x(50), bbox_max_y(50), bbox_max_z(50),
          hash("") {}

    ShapeHandle(const std::string& shapeId, const std::string& shapeType)
        : id(shapeId), type(shapeType),
          bbox_min_x(-50), bbox_min_y(-50), bbox_min_z(-50),
          bbox_max_x(50), bbox_max_y(50), bbox_max_z(50),
          hash(shapeId.substr(0, 16)) {}
};

/**
 * Compute bounding box for a shape
 */
void computeBoundingBox(const TopoDS_Shape& shape, ShapeHandle& handle) {
    Bnd_Box bbox;
    BRepBndLib::Add(shape, bbox);

    if (!bbox.IsVoid()) {
        double xmin, ymin, zmin, xmax, ymax, zmax;
        bbox.Get(xmin, ymin, zmin, xmax, ymax, zmax);

        handle.bbox_min_x = (float)xmin;
        handle.bbox_min_y = (float)ymin;
        handle.bbox_min_z = (float)zmin;
        handle.bbox_max_x = (float)xmax;
        handle.bbox_max_y = (float)ymax;
        handle.bbox_max_z = (float)zmax;
    }
}

/**
 * Shape Creation Functions
 */
ShapeHandle makeBox(double dx, double dy, double dz) {
    try {
        BRepPrimAPI_MakeBox boxMaker(dx, dy, dz);
        boxMaker.Build();
        if (boxMaker.IsDone()) {
            TopoDS_Shape box = boxMaker.Shape();
            std::string id = ShapeManager::storeShape(box);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(box, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle makeSphere(double radius) {
    try {
        BRepPrimAPI_MakeSphere sphereMaker(radius);
        sphereMaker.Build();
        if (sphereMaker.IsDone()) {
            TopoDS_Shape sphere = sphereMaker.Shape();
            std::string id = ShapeManager::storeShape(sphere);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(sphere, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle makeCylinder(double radius, double height) {
    try {
        BRepPrimAPI_MakeCylinder cylinderMaker(radius, height);
        cylinderMaker.Build();
        if (cylinderMaker.IsDone()) {
            TopoDS_Shape cylinder = cylinderMaker.Shape();
            std::string id = ShapeManager::storeShape(cylinder);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(cylinder, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Boolean Operations
 */
ShapeHandle booleanUnion(const std::string& shape1Id, const std::string& shape2Id) {
    auto shape1 = ShapeManager::getShape(shape1Id);
    auto shape2 = ShapeManager::getShape(shape2Id);

    if (!shape1 || !shape2) {
        return ShapeHandle("", "solid");
    }

    try {
        BRepAlgoAPI_Fuse fuseMaker(*shape1, *shape2);
        fuseMaker.Build();
        if (fuseMaker.IsDone()) {
            TopoDS_Shape result = fuseMaker.Shape();
            std::string id = ShapeManager::storeShape(result);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle booleanSubtract(const std::string& shape1Id, const std::string& shape2Id) {
    auto shape1 = ShapeManager::getShape(shape1Id);
    auto shape2 = ShapeManager::getShape(shape2Id);

    if (!shape1 || !shape2) {
        return ShapeHandle("", "solid");
    }

    try {
        BRepAlgoAPI_Cut cutMaker(*shape1, *shape2);
        cutMaker.Build();
        if (cutMaker.IsDone()) {
            TopoDS_Shape result = cutMaker.Shape();
            std::string id = ShapeManager::storeShape(result);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle booleanIntersect(const std::string& shape1Id, const std::string& shape2Id) {
    auto shape1 = ShapeManager::getShape(shape1Id);
    auto shape2 = ShapeManager::getShape(shape2Id);

    if (!shape1 || !shape2) {
        return ShapeHandle("", "solid");
    }

    try {
        BRepAlgoAPI_Common commonMaker(*shape1, *shape2);
        commonMaker.Build();
        if (commonMaker.IsDone()) {
            TopoDS_Shape result = commonMaker.Shape();
            std::string id = ShapeManager::storeShape(result);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Tessellation Function - simplified version using modern OCCT API
 */
MeshData tessellate(const std::string& shapeId, double precision = 0.1, double angle = 0.5) {
    MeshData meshData;
    auto shape = ShapeManager::getShape(shapeId);

    if (!shape) {
        return meshData;
    }

    try {
        // Create mesh
        BRepMesh_IncrementalMesh mesh(*shape, precision, Standard_False, angle);

        if (!mesh.IsDone()) {
            return meshData;
        }

        // Extract triangulated faces using simplified approach
        for (TopExp_Explorer faceExp(*shape, TopAbs_FACE); faceExp.More(); faceExp.Next()) {
            const TopoDS_Face& face = TopoDS::Face(faceExp.Current());
            TopLoc_Location location;

            Handle(Poly_Triangulation) triangulation = BRep_Tool::Triangulation(face, location);
            if (triangulation.IsNull()) {
                continue;
            }

            // Get transformation
            gp_Trsf transformation = location.Transformation();

            // Use modern OCCT API for accessing triangulation data
            Standard_Integer nbNodes = triangulation->NbNodes();
            Standard_Integer nbTriangles = triangulation->NbTriangles();

            int nodeOffset = (int)meshData.positions.size() / 3;

            // Add vertices using modern API
            for (Standard_Integer i = 1; i <= nbNodes; i++) {
                gp_Pnt point = triangulation->Node(i);
                point.Transform(transformation);

                meshData.positions.push_back((float)point.X());
                meshData.positions.push_back((float)point.Y());
                meshData.positions.push_back((float)point.Z());

                // Add dummy normals for now
                meshData.normals.push_back(0.0f);
                meshData.normals.push_back(0.0f);
                meshData.normals.push_back(1.0f);
            }

            // Add triangles using modern API
            for (Standard_Integer i = 1; i <= nbTriangles; i++) {
                const Poly_Triangle& triangle = triangulation->Triangle(i);
                Standard_Integer n1, n2, n3;
                triangle.Get(n1, n2, n3);

                meshData.indices.push_back(nodeOffset + n1 - 1);
                meshData.indices.push_back(nodeOffset + n2 - 1);
                meshData.indices.push_back(nodeOffset + n3 - 1);
            }
        }

        // Extract edges for wireframe
        for (TopExp_Explorer edgeExp(*shape, TopAbs_EDGE); edgeExp.More(); edgeExp.Next()) {
            const TopoDS_Edge& edge = TopoDS::Edge(edgeExp.Current());
            // Simplified edge handling - just store some indices
            if (!meshData.indices.empty()) {
                meshData.edges.push_back(0);
                meshData.edges.push_back(1);
            }
        }

    } catch (const std::exception& e) {}

    return meshData;
}

/**
 * Feature Operations - simplified versions
 */
ShapeHandle makeFillet(const std::string& shapeId, double radius) {
    auto shape = ShapeManager::getShape(shapeId);

    if (!shape) {
        return ShapeHandle("", "solid");
    }

    try {
        BRepFilletAPI_MakeFillet filletMaker(*shape);

        // Add all edges for filleting
        for (TopExp_Explorer edgeExp(*shape, TopAbs_EDGE); edgeExp.More(); edgeExp.Next()) {
            const TopoDS_Edge& edge = TopoDS::Edge(edgeExp.Current());
            filletMaker.Add(radius, edge);
        }

        filletMaker.Build();
        if (filletMaker.IsDone()) {
            TopoDS_Shape result = filletMaker.Shape();
            std::string id = ShapeManager::storeShape(result);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle makeChamfer(const std::string& shapeId, double distance) {
    auto shape = ShapeManager::getShape(shapeId);

    if (!shape) {
        return ShapeHandle("", "solid");
    }

    try {
        BRepFilletAPI_MakeChamfer chamferMaker(*shape);

        // Add all edges for chamfering - use simpler API
        for (TopExp_Explorer edgeExp(*shape, TopAbs_EDGE); edgeExp.More(); edgeExp.Next()) {
            const TopoDS_Edge& edge = TopoDS::Edge(edgeExp.Current());
            chamferMaker.Add(distance, edge);
        }

        chamferMaker.Build();
        if (chamferMaker.IsDone()) {
            TopoDS_Shape result = chamferMaker.Shape();
            std::string id = ShapeManager::storeShape(result);
            ShapeHandle handle(id, "solid");
            computeBoundingBox(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Memory Management Functions
 */
void deleteShape(const std::string& shapeId) {
    ShapeManager::deleteShape(shapeId);
}

size_t getShapeCount() {
    return ShapeManager::getShapeCount();
}

/**
 * Emscripten Bindings
 */
EMSCRIPTEN_BINDINGS(occt_bindings) {
    // Register MeshData struct
    value_object<MeshData>("MeshData")
        .field("positions", &MeshData::positions)
        .field("normals", &MeshData::normals)
        .field("indices", &MeshData::indices)
        .field("edges", &MeshData::edges);

    // Register ShapeHandle struct
    value_object<ShapeHandle>("ShapeHandle")
        .field("id", &ShapeHandle::id)
        .field("type", &ShapeHandle::type)
        .field("bbox_min_x", &ShapeHandle::bbox_min_x)
        .field("bbox_min_y", &ShapeHandle::bbox_min_y)
        .field("bbox_min_z", &ShapeHandle::bbox_min_z)
        .field("bbox_max_x", &ShapeHandle::bbox_max_x)
        .field("bbox_max_y", &ShapeHandle::bbox_max_y)
        .field("bbox_max_z", &ShapeHandle::bbox_max_z)
        .field("hash", &ShapeHandle::hash);

    // Register vector types
    register_vector<float>("VectorFloat");
    register_vector<uint32_t>("VectorUint");

    // Register shape creation functions
    function("makeBox", &makeBox);
    function("makeSphere", &makeSphere);
    function("makeCylinder", &makeCylinder);

    // Register boolean operations
    function("booleanUnion", &booleanUnion);
    function("booleanSubtract", &booleanSubtract);
    function("booleanIntersect", &booleanIntersect);

    // Register tessellation function
    function("tessellate", &tessellate);
    function("tessellateWithParams", select_overload<MeshData(const std::string&, double, double)>(&tessellate));

    // Register feature operations
    function("makeFillet", &makeFillet);
    function("makeChamfer", &makeChamfer);

    // Register memory management functions
    function("deleteShape", &deleteShape);
    function("getShapeCount", &getShapeCount);
}