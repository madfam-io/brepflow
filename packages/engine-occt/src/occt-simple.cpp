// Simplified OCCT WebAssembly Bindings for BrepFlow
// Uses minimal OCCT dependencies to ensure successful compilation

#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <string>
#include <vector>
#include <memory>
#include <sstream>
#include <iomanip>

using namespace emscripten;

// JavaScript-friendly shape handle
struct ShapeHandle {
    std::string id;
    std::string type;
    double bbox_min_x;
    double bbox_min_y;
    double bbox_min_z;
    double bbox_max_x;
    double bbox_max_y;
    double bbox_max_z;
    std::string hash;

    ShapeHandle()
        : id(""), type("solid"),
          bbox_min_x(0), bbox_min_y(0), bbox_min_z(0),
          bbox_max_x(0), bbox_max_y(0), bbox_max_z(0),
          hash("") {}

    ShapeHandle(const std::string& id, const std::string& type,
                double minX, double minY, double minZ,
                double maxX, double maxY, double maxZ)
        : id(id), type(type),
          bbox_min_x(minX), bbox_min_y(minY), bbox_min_z(minZ),
          bbox_max_x(maxX), bbox_max_y(maxY), bbox_max_z(maxZ),
          hash(id.substr(0, 16)) {}
};

// Mesh data structure for JavaScript
struct MeshData {
    std::vector<float> positions;
    std::vector<float> normals;
    std::vector<unsigned int> indices;
    std::vector<unsigned int> edges;

    MeshData() {}
};

// ID generator
class IDGenerator {
private:
    static int counter;
public:
    static std::string generateId(const std::string& prefix) {
        std::stringstream ss;
        ss << prefix << "_" << std::setfill('0') << std::setw(8) << counter++;
        return ss.str();
    }
};

int IDGenerator::counter = 1;

// Simple shape storage
class ShapeStore {
private:
    static std::vector<ShapeHandle> shapes;
public:
    static std::string addShape(const ShapeHandle& shape) {
        shapes.push_back(shape);
        return shape.id;
    }

    static ShapeHandle* getShape(const std::string& id) {
        for (auto& shape : shapes) {
            if (shape.id == id) {
                return &shape;
            }
        }
        return nullptr;
    }

    static void deleteShape(const std::string& id) {
        shapes.erase(
            std::remove_if(shapes.begin(), shapes.end(),
                [&id](const ShapeHandle& s) { return s.id == id; }),
            shapes.end()
        );
    }

    static int getShapeCount() {
        return shapes.size();
    }
};

std::vector<ShapeHandle> ShapeStore::shapes;

// Geometry creation functions (mock implementations for now)
ShapeHandle makeBox(double dx, double dy, double dz) {
    std::string id = IDGenerator::generateId("box");

    // Create bounding box
    double halfDx = dx / 2.0;
    double halfDy = dy / 2.0;
    double halfDz = dz / 2.0;

    ShapeHandle shape(id, "solid",
                      -halfDx, -halfDy, -halfDz,
                      halfDx, halfDy, halfDz);

    ShapeStore::addShape(shape);
    return shape;
}

ShapeHandle makeSphere(double radius) {
    std::string id = IDGenerator::generateId("sphere");

    ShapeHandle shape(id, "solid",
                      -radius, -radius, -radius,
                      radius, radius, radius);

    ShapeStore::addShape(shape);
    return shape;
}

ShapeHandle makeCylinder(double radius, double height) {
    std::string id = IDGenerator::generateId("cylinder");

    double halfHeight = height / 2.0;

    ShapeHandle shape(id, "solid",
                      -radius, -radius, -halfHeight,
                      radius, radius, halfHeight);

    ShapeStore::addShape(shape);
    return shape;
}

// Boolean operations (mock implementations)
ShapeHandle booleanUnion(const std::string& shape1Id, const std::string& shape2Id) {
    ShapeHandle* shape1 = ShapeStore::getShape(shape1Id);
    ShapeHandle* shape2 = ShapeStore::getShape(shape2Id);

    if (!shape1 || !shape2) {
        return ShapeHandle();
    }

    std::string id = IDGenerator::generateId("union");

    // Compute combined bounding box
    double minX = std::min(shape1->bbox_min_x, shape2->bbox_min_x);
    double minY = std::min(shape1->bbox_min_y, shape2->bbox_min_y);
    double minZ = std::min(shape1->bbox_min_z, shape2->bbox_min_z);
    double maxX = std::max(shape1->bbox_max_x, shape2->bbox_max_x);
    double maxY = std::max(shape1->bbox_max_y, shape2->bbox_max_y);
    double maxZ = std::max(shape1->bbox_max_z, shape2->bbox_max_z);

    ShapeHandle result(id, "solid", minX, minY, minZ, maxX, maxY, maxZ);
    ShapeStore::addShape(result);
    return result;
}

ShapeHandle booleanSubtract(const std::string& shape1Id, const std::string& shape2Id) {
    ShapeHandle* shape1 = ShapeStore::getShape(shape1Id);

    if (!shape1) {
        return ShapeHandle();
    }

    std::string id = IDGenerator::generateId("subtract");

    // Use shape1's bounding box (simplified)
    ShapeHandle result(id, "solid",
                       shape1->bbox_min_x, shape1->bbox_min_y, shape1->bbox_min_z,
                       shape1->bbox_max_x, shape1->bbox_max_y, shape1->bbox_max_z);

    ShapeStore::addShape(result);
    return result;
}

ShapeHandle booleanIntersect(const std::string& shape1Id, const std::string& shape2Id) {
    ShapeHandle* shape1 = ShapeStore::getShape(shape1Id);
    ShapeHandle* shape2 = ShapeStore::getShape(shape2Id);

    if (!shape1 || !shape2) {
        return ShapeHandle();
    }

    std::string id = IDGenerator::generateId("intersect");

    // Compute intersection bounding box
    double minX = std::max(shape1->bbox_min_x, shape2->bbox_min_x);
    double minY = std::max(shape1->bbox_min_y, shape2->bbox_min_y);
    double minZ = std::max(shape1->bbox_min_z, shape2->bbox_min_z);
    double maxX = std::min(shape1->bbox_max_x, shape2->bbox_max_x);
    double maxY = std::min(shape1->bbox_max_y, shape2->bbox_max_y);
    double maxZ = std::min(shape1->bbox_max_z, shape2->bbox_max_z);

    ShapeHandle result(id, "solid", minX, minY, minZ, maxX, maxY, maxZ);
    ShapeStore::addShape(result);
    return result;
}

// Generate simple box mesh for testing
MeshData generateBoxMesh(double dx, double dy, double dz) {
    MeshData mesh;

    double halfDx = dx / 2.0;
    double halfDy = dy / 2.0;
    double halfDz = dz / 2.0;

    // 8 vertices of a box
    float vertices[] = {
        static_cast<float>(-halfDx), static_cast<float>(-halfDy), static_cast<float>(-halfDz),  // 0
        static_cast<float>( halfDx), static_cast<float>(-halfDy), static_cast<float>(-halfDz),  // 1
        static_cast<float>( halfDx), static_cast<float>( halfDy), static_cast<float>(-halfDz),  // 2
        static_cast<float>(-halfDx), static_cast<float>( halfDy), static_cast<float>(-halfDz),  // 3
        static_cast<float>(-halfDx), static_cast<float>(-halfDy), static_cast<float>( halfDz),  // 4
        static_cast<float>( halfDx), static_cast<float>(-halfDy), static_cast<float>( halfDz),  // 5
        static_cast<float>( halfDx), static_cast<float>( halfDy), static_cast<float>( halfDz),  // 6
        static_cast<float>(-halfDx), static_cast<float>( halfDy), static_cast<float>( halfDz)   // 7
    };

    for (int i = 0; i < 24; i++) {
        mesh.positions.push_back(vertices[i]);
    }

    // Simple normals (one per vertex)
    for (int i = 0; i < 8; i++) {
        mesh.normals.push_back(0);
        mesh.normals.push_back(0);
        mesh.normals.push_back(1);
    }

    // Box faces (12 triangles)
    unsigned int faces[] = {
        0, 1, 2,  0, 2, 3,  // Front
        4, 7, 6,  4, 6, 5,  // Back
        0, 3, 7,  0, 7, 4,  // Left
        1, 5, 6,  1, 6, 2,  // Right
        3, 2, 6,  3, 6, 7,  // Top
        0, 4, 5,  0, 5, 1   // Bottom
    };

    for (int i = 0; i < 36; i++) {
        mesh.indices.push_back(faces[i]);
    }

    // Simple edges
    mesh.edges.push_back(0);
    mesh.edges.push_back(1);
    mesh.edges.push_back(2);
    mesh.edges.push_back(3);

    return mesh;
}

// Tessellation function
MeshData tessellate(const std::string& shapeId, double precision = 0.1, double angle = 0.5) {
    ShapeHandle* shape = ShapeStore::getShape(shapeId);

    if (!shape) {
        return MeshData();
    }

    // For now, generate a simple box mesh based on bounding box
    double dx = shape->bbox_max_x - shape->bbox_min_x;
    double dy = shape->bbox_max_y - shape->bbox_min_y;
    double dz = shape->bbox_max_z - shape->bbox_min_z;

    return generateBoxMesh(dx, dy, dz);
}

// Memory management
void deleteShape(const std::string& shapeId) {
    ShapeStore::deleteShape(shapeId);
}

int getShapeCount() {
    return ShapeStore::getShapeCount();
}

// Version info
std::string getOCCTVersion() {
    return "7.8.0-simplified";
}

// Status check
std::string getStatus() {
    return "OCCT Simplified WASM Module Loaded - Mock Geometry Active";
}

// Emscripten bindings
EMSCRIPTEN_BINDINGS(occt_module) {
    // ShapeHandle structure
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

    // MeshData structure
    value_object<MeshData>("MeshData")
        .field("positions", &MeshData::positions)
        .field("normals", &MeshData::normals)
        .field("indices", &MeshData::indices)
        .field("edges", &MeshData::edges);

    // Register vector types
    register_vector<float>("VectorFloat");
    register_vector<unsigned int>("VectorUint");

    // Geometry creation
    function("makeBox", &makeBox);
    function("makeSphere", &makeSphere);
    function("makeCylinder", &makeCylinder);

    // Boolean operations
    function("booleanUnion", &booleanUnion);
    function("booleanSubtract", &booleanSubtract);
    function("booleanIntersect", &booleanIntersect);

    // Tessellation
    function("tessellate", &tessellate);

    // Memory management
    function("deleteShape", &deleteShape);
    function("getShapeCount", &getShapeCount);

    // Version and status
    function("getOCCTVersion", &getOCCTVersion);
    function("getStatus", &getStatus);
}