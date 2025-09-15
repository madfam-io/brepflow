// Minimal OCCT WebAssembly Test
// Tests basic OCCT functionality without complex dependencies

#include <emscripten/bind.h>
#include <string>

using namespace emscripten;

// Simple test function to verify WASM compilation
std::string getOCCTStatus() {
    return "OCCT WASM module loaded successfully - Mock implementation active";
}

// Basic shape handle for testing
struct TestShape {
    std::string id;
    std::string type;
    double size;

    TestShape() : id(""), type(""), size(0) {}

    TestShape(const std::string& id, const std::string& type, double size)
        : id(id), type(type), size(size) {}
};

// Create a test box
TestShape makeTestBox(double dx, double dy, double dz) {
    double size = dx * dy * dz;
    return TestShape("box_test", "solid", size);
}

// Emscripten bindings
EMSCRIPTEN_BINDINGS(occt_minimal) {
    // Test function
    function("getOCCTStatus", &getOCCTStatus);
    function("makeTestBox", &makeTestBox);

    // TestShape structure
    value_object<TestShape>("TestShape")
        .field("id", &TestShape::id)
        .field("type", &TestShape::type)
        .field("size", &TestShape::size);
}