// OCCT WebAssembly Bindings for BrepFlow
// Provides a TypeScript-friendly interface to Open CASCADE Technology

#include <emscripten/bind.h>
#include <emscripten/val.h>

#include <BRepPrimAPI_MakeBox.hxx>
#include <BRepPrimAPI_MakeSphere.hxx>
#include <BRepPrimAPI_MakeCylinder.hxx>
#include <BRepPrimAPI_MakeCone.hxx>
#include <BRepPrimAPI_MakeTorus.hxx>

#include <BRepAlgoAPI_Cut.hxx>
#include <BRepAlgoAPI_Fuse.hxx>
#include <BRepAlgoAPI_Common.hxx>

#include <BRepFilletAPI_MakeFillet.hxx>
#include <BRepFilletAPI_MakeChamfer.hxx>

#include <BRepMesh_IncrementalMesh.hxx>
#include <BRep_Tool.hxx>
#include <TopExp_Explorer.hxx>
#include <TopoDS.hxx>
#include <TopoDS_Shape.hxx>
#include <TopoDS_Face.hxx>
#include <TopoDS_Edge.hxx>
#include <Poly_Triangulation.hxx>
#include <TColgp_Array1OfPnt.hxx>
#include <Poly_Array1OfTriangle.hxx>

#include <STEPControl_Reader.hxx>
#include <STEPControl_Writer.hxx>
#include <IGESControl_Reader.hxx>
#include <IGESControl_Writer.hxx>
#include <STEPControl_StepModelType.hxx>

#include <Standard_Version.hxx>
#include <Bnd_Box.hxx>
#include <BRepBndLib.hxx>

#include <map>
#include <string>
#include <vector>
#include <memory>
#include <sstream>
#include <iomanip>

using namespace emscripten;

// Shape management with unique IDs
class ShapeManager {
private:
    static std::map<std::string, TopoDS_Shape> shapes;
    static int idCounter;

    static std::string generateId(const std::string& prefix) {
        std::stringstream ss;
        ss << prefix << "_" << std::setfill('0') << std::setw(8) << idCounter++;
        return ss.str();
    }

public:
    static std::string addShape(const TopoDS_Shape& shape, const std::string& type) {
        std::string id = generateId(type);
        shapes[id] = shape;
        return id;
    }

    static TopoDS_Shape* getShape(const std::string& id) {
        auto it = shapes.find(id);
        if (it != shapes.end()) {
            return &it->second;
        }
        return nullptr;
    }

    static void deleteShape(const std::string& id) {
        shapes.erase(id);
    }

    static int getShapeCount() {
        return shapes.size();
    }

    static void clear() {
        shapes.clear();
    }
};

std::map<std::string, TopoDS_Shape> ShapeManager::shapes;
int ShapeManager::idCounter = 1;

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

    ShapeHandle() = default;

    ShapeHandle(const std::string& id, const TopoDS_Shape& shape, const std::string& type)
        : id(id), type(type) {

        // Calculate bounding box
        Bnd_Box bbox;
        BRepBndLib::Add(shape, bbox);

        if (!bbox.IsVoid()) {
            double xmin, ymin, zmin, xmax, ymax, zmax;
            bbox.Get(xmin, ymin, zmin, xmax, ymax, zmax);

            bbox_min_x = xmin;
            bbox_min_y = ymin;
            bbox_min_z = zmin;
            bbox_max_x = xmax;
            bbox_max_y = ymax;
            bbox_max_z = zmax;
        } else {
            bbox_min_x = bbox_min_y = bbox_min_z = 0;
            bbox_max_x = bbox_max_y = bbox_max_z = 0;
        }

        // Simple hash based on ID for now
        hash = id.substr(0, 16);
    }
};

// Mesh data structure for JavaScript
struct MeshData {
    std::vector<float> positions;
    std::vector<float> normals;
    std::vector<unsigned int> indices;
    std::vector<unsigned int> edges;
};

// Geometry creation functions
ShapeHandle makeBox(double dx, double dy, double dz) {
    try {
        BRepPrimAPI_MakeBox boxMaker(dx, dy, dz);
        boxMaker.Build();

        if (!boxMaker.IsDone()) {
            throw std::runtime_error("Failed to create box");
        }

        TopoDS_Shape shape = boxMaker.Shape();
        std::string id = ShapeManager::addShape(shape, "box");

        return ShapeHandle(id, shape, "solid");
    } catch (const Standard_Failure& e) {
        throw std::runtime_error(std::string("OCCT error: ") + e.GetMessageString());
    }
}

ShapeHandle makeSphere(double radius) {
    try {
        BRepPrimAPI_MakeSphere sphereMaker(radius);
        sphereMaker.Build();

        if (!sphereMaker.IsDone()) {
            throw std::runtime_error("Failed to create sphere");
        }

        TopoDS_Shape shape = sphereMaker.Shape();
        std::string id = ShapeManager::addShape(shape, "sphere");

        return ShapeHandle(id, shape, "solid");
    } catch (const Standard_Failure& e) {
        throw std::runtime_error(std::string("OCCT error: ") + e.GetMessageString());
    }
}

ShapeHandle makeCylinder(double radius, double height) {
    try {
        BRepPrimAPI_MakeCylinder cylMaker(radius, height);
        cylMaker.Build();

        if (!cylMaker.IsDone()) {
            throw std::runtime_error("Failed to create cylinder");
        }

        TopoDS_Shape shape = cylMaker.Shape();
        std::string id = ShapeManager::addShape(shape, "cylinder");

        return ShapeHandle(id, shape, "solid");
    } catch (const Standard_Failure& e) {
        throw std::runtime_error(std::string("OCCT error: ") + e.GetMessageString());
    }
}

// Boolean operations
ShapeHandle booleanUnion(const std::string& shape1Id, const std::string& shape2Id) {
    TopoDS_Shape* shape1 = ShapeManager::getShape(shape1Id);
    TopoDS_Shape* shape2 = ShapeManager::getShape(shape2Id);

    if (!shape1 || !shape2) {
        throw std::runtime_error("Invalid shape ID");
    }

    try {
        BRepAlgoAPI_Fuse fuse(*shape1, *shape2);
        fuse.Build();

        if (!fuse.IsDone()) {
            throw std::runtime_error("Boolean union failed");
        }

        TopoDS_Shape result = fuse.Shape();
        std::string id = ShapeManager::addShape(result, "union");

        return ShapeHandle(id, result, "solid");
    } catch (const Standard_Failure& e) {
        throw std::runtime_error(std::string("OCCT error: ") + e.GetMessageString());
    }
}

ShapeHandle booleanSubtract(const std::string& shape1Id, const std::string& shape2Id) {
    TopoDS_Shape* shape1 = ShapeManager::getShape(shape1Id);
    TopoDS_Shape* shape2 = ShapeManager::getShape(shape2Id);

    if (!shape1 || !shape2) {
        throw std::runtime_error("Invalid shape ID");
    }

    try {
        BRepAlgoAPI_Cut cut(*shape1, *shape2);
        cut.Build();

        if (!cut.IsDone()) {
            throw std::runtime_error("Boolean subtract failed");
        }

        TopoDS_Shape result = cut.Shape();
        std::string id = ShapeManager::addShape(result, "subtract");

        return ShapeHandle(id, result, "solid");
    } catch (const Standard_Failure& e) {
        throw std::runtime_error(std::string("OCCT error: ") + e.GetMessageString());
    }
}

ShapeHandle booleanIntersect(const std::string& shape1Id, const std::string& shape2Id) {
    TopoDS_Shape* shape1 = ShapeManager::getShape(shape1Id);
    TopoDS_Shape* shape2 = ShapeManager::getShape(shape2Id);

    if (!shape1 || !shape2) {
        throw std::runtime_error("Invalid shape ID");
    }

    try {
        BRepAlgoAPI_Common common(*shape1, *shape2);
        common.Build();

        if (!common.IsDone()) {
            throw std::runtime_error("Boolean intersect failed");
        }

        TopoDS_Shape result = common.Shape();
        std::string id = ShapeManager::addShape(result, "intersect");

        return ShapeHandle(id, result, "solid");
    } catch (const Standard_Failure& e) {
        throw std::runtime_error(std::string("OCCT error: ") + e.GetMessageString());
    }
}

// Tessellation for rendering
MeshData tessellate(const std::string& shapeId, double precision = 0.1, double angle = 0.5) {
    TopoDS_Shape* shape = ShapeManager::getShape(shapeId);

    if (!shape) {
        throw std::runtime_error("Invalid shape ID");
    }

    MeshData meshData;

    try {
        // Perform meshing
        BRepMesh_IncrementalMesh mesh(*shape, precision, Standard_False, angle);
        mesh.Perform();

        if (!mesh.IsDone()) {
            throw std::runtime_error("Tessellation failed");
        }

        unsigned int vertexOffset = 0;

        // Iterate through all faces
        for (TopExp_Explorer exp(*shape, TopAbs_FACE); exp.More(); exp.Next()) {
            TopoDS_Face face = TopoDS::Face(exp.Current());
            TopLoc_Location location;

            Handle(Poly_Triangulation) triangulation = BRep_Tool::Triangulation(face, location);

            if (triangulation.IsNull()) {
                continue;
            }

            // Get transformation
            const gp_Trsf& transform = location.Transformation();

            // Add vertices
            const TColgp_Array1OfPnt& nodes = triangulation->Nodes();
            for (int i = nodes.Lower(); i <= nodes.Upper(); i++) {
                gp_Pnt point = nodes(i);
                point.Transform(transform);

                meshData.positions.push_back(static_cast<float>(point.X()));
                meshData.positions.push_back(static_cast<float>(point.Y()));
                meshData.positions.push_back(static_cast<float>(point.Z()));

                // Simple normal calculation (could be improved)
                meshData.normals.push_back(0.0f);
                meshData.normals.push_back(0.0f);
                meshData.normals.push_back(1.0f);
            }

            // Add triangles
            const Poly_Array1OfTriangle& triangles = triangulation->Triangles();
            for (int i = triangles.Lower(); i <= triangles.Upper(); i++) {
                Poly_Triangle triangle = triangles(i);
                int n1, n2, n3;
                triangle.Get(n1, n2, n3);

                meshData.indices.push_back(vertexOffset + n1 - 1);
                meshData.indices.push_back(vertexOffset + n2 - 1);
                meshData.indices.push_back(vertexOffset + n3 - 1);
            }

            vertexOffset += nodes.Upper() - nodes.Lower() + 1;
        }

        // Add edges for wireframe rendering
        for (TopExp_Explorer exp(*shape, TopAbs_EDGE); exp.More(); exp.Next()) {
            // Simplified edge extraction - would need proper implementation
            meshData.edges.push_back(0);
            meshData.edges.push_back(1);
        }

    } catch (const Standard_Failure& e) {
        throw std::runtime_error(std::string("OCCT tessellation error: ") + e.GetMessageString());
    }

    return meshData;
}

// Memory management
void deleteShape(const std::string& shapeId) {
    ShapeManager::deleteShape(shapeId);
}

int getShapeCount() {
    return ShapeManager::getShapeCount();
}

// Version info
std::string getOCCTVersion() {
    return OCC_VERSION_COMPLETE;
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

    // Version info
    function("getOCCTVersion", &getOCCTVersion);
}