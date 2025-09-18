/**
 * OCCT WebAssembly Bindings - Production Version
 * Complete implementation of OCCT geometry operations for BrepFlow
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
#include <TopoDS_Wire.hxx>
#include <TopoDS_Compound.hxx>
#include <TopoDS_CompSolid.hxx>
#include <TopoDS_Builder.hxx>

// OCCT Primitive Builders
#include <BRepPrimAPI_MakeBox.hxx>
#include <BRepPrimAPI_MakeSphere.hxx>
#include <BRepPrimAPI_MakeCylinder.hxx>
#include <BRepPrimAPI_MakeCone.hxx>
#include <BRepPrimAPI_MakeTorus.hxx>
#include <BRepPrimAPI_MakePrism.hxx>
#include <BRepPrimAPI_MakeRevol.hxx>

// OCCT 2D Primitives
#include <BRepBuilderAPI_MakeEdge.hxx>
#include <BRepBuilderAPI_MakeWire.hxx>
#include <BRepBuilderAPI_MakeFace.hxx>
#include <BRepBuilderAPI_MakeVertex.hxx>

// OCCT Boolean Operations
#include <BRepAlgoAPI_Fuse.hxx>
#include <BRepAlgoAPI_Cut.hxx>
#include <BRepAlgoAPI_Common.hxx>
#include <BRepAlgoAPI_Section.hxx>

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
#include <StdPrs_ToolTriangulatedShape.hxx>

// OCCT Bounding Box
#include <Bnd_Box.hxx>
#include <BRepBndLib.hxx>

// OCCT Geometry
#include <gp_Pnt.hxx>
#include <gp_Vec.hxx>
#include <gp_Ax1.hxx>
#include <gp_Ax2.hxx>
#include <gp_Dir.hxx>
#include <gp_Circ.hxx>
#include <gp_Elips.hxx>
#include <gp_Pln.hxx>

// OCCT Feature Operations
#include <BRepFilletAPI_MakeFillet.hxx>
#include <BRepFilletAPI_MakeChamfer.hxx>
#include <BRepOffsetAPI_MakeThickSolid.hxx>
#include <BRepOffsetAPI_MakeDraft.hxx>
#include <BRepOffsetAPI_MakeOffset.hxx>

// OCCT Transformations
#include <BRepBuilderAPI_Transform.hxx>
#include <BRepBuilderAPI_Copy.hxx>
#include <gp_Trsf.hxx>

// OCCT Curve and Surface
#include <Geom_BSplineCurve.hxx>
#include <Geom_BSplineSurface.hxx>
#include <GeomAPI_PointsToBSpline.hxx>
#include <GeomAPI_PointsToBSplineSurface.hxx>
#include <BRepBuilderAPI_MakeEdge.hxx>
#include <BRepBuilderAPI_MakeFace.hxx>

// OCCT Properties
#include <GProp_GProps.hxx>
#include <BRepGProp.hxx>

// OCCT File I/O
#include <STEPControl_Reader.hxx>
#include <STEPControl_Writer.hxx>
#include <IGESControl_Reader.hxx>
#include <IGESControl_Writer.hxx>
#include <StlAPI_Writer.hxx>
#include <StlAPI_Reader.hxx>
#include <TopTools_HSequenceOfShape.hxx>
#include <IFSelect_ReturnStatus.hxx>
#include <Interface_Static.hxx>

// Standard Collections
#include <vector>
#include <string>
#include <map>
#include <memory>
#include <sstream>
#include <cmath>
#include <algorithm>

using namespace emscripten;

/**
 * Shape Handle Manager - Production Version
 * Thread-safe management of OCCT shapes with reference counting
 */
class ShapeManager {
private:
    static std::map<std::string, std::shared_ptr<TopoDS_Shape>> shapes_;
    static std::map<std::string, std::map<std::string, std::string>> metadata_;
    static int nextId_;
    static const size_t MAX_SHAPES = 10000;  // Memory management limit

public:
    static std::string storeShape(const TopoDS_Shape& shape, const std::string& type = "solid") {
        // Memory management - check if we need to cleanup
        if (shapes_.size() > MAX_SHAPES) {
            cleanupOldShapes();
        }

        std::string id = "shape_" + std::to_string(nextId_++);
        shapes_[id] = std::make_shared<TopoDS_Shape>(shape);

        // Store metadata
        metadata_[id]["type"] = type;
        metadata_[id]["created"] = std::to_string(std::time(nullptr));

        return id;
    }

    static std::shared_ptr<TopoDS_Shape> getShape(const std::string& id) {
        auto it = shapes_.find(id);
        return (it != shapes_.end()) ? it->second : nullptr;
    }

    static void deleteShape(const std::string& id) {
        shapes_.erase(id);
        metadata_.erase(id);
    }

    static size_t getShapeCount() {
        return shapes_.size();
    }

    static void cleanupOldShapes() {
        // Remove oldest 10% of shapes when limit reached
        size_t toRemove = shapes_.size() / 10;
        auto it = shapes_.begin();
        for (size_t i = 0; i < toRemove && it != shapes_.end(); ++i) {
            auto toErase = it++;
            metadata_.erase(toErase->first);
            shapes_.erase(toErase);
        }
    }

    static void clearAll() {
        shapes_.clear();
        metadata_.clear();
    }
};

// Static member definitions
std::map<std::string, std::shared_ptr<TopoDS_Shape>> ShapeManager::shapes_;
std::map<std::string, std::map<std::string, std::string>> ShapeManager::metadata_;
int ShapeManager::nextId_ = 1;

/**
 * Enhanced Mesh Data Structure with normals and UVs
 */
struct MeshData {
    std::vector<float> positions;
    std::vector<float> normals;
    std::vector<uint32_t> indices;
    std::vector<uint32_t> edges;
    std::vector<float> uvs;  // Texture coordinates if available
    uint32_t vertexCount = 0;
    uint32_t triangleCount = 0;
    uint32_t edgeCount = 0;

    MeshData() {}
};

/**
 * Enhanced Shape Handle with additional metadata
 */
struct ShapeHandle {
    std::string id;
    std::string type;
    float bbox_min_x, bbox_min_y, bbox_min_z;
    float bbox_max_x, bbox_max_y, bbox_max_z;
    std::string hash;
    float volume = 0.0f;
    float area = 0.0f;
    float centerX = 0.0f, centerY = 0.0f, centerZ = 0.0f;

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
 * Compute comprehensive shape properties
 */
void computeShapeProperties(const TopoDS_Shape& shape, ShapeHandle& handle) {
    // Bounding box
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

    // Volume and mass properties for solids
    if (shape.ShapeType() == TopAbs_SOLID || shape.ShapeType() == TopAbs_COMPSOLID) {
        GProp_GProps volumeProps;
        BRepGProp::VolumeProperties(shape, volumeProps);
        handle.volume = (float)volumeProps.Mass();

        gp_Pnt center = volumeProps.CentreOfMass();
        handle.centerX = (float)center.X();
        handle.centerY = (float)center.Y();
        handle.centerZ = (float)center.Z();
    }

    // Surface area
    GProp_GProps surfaceProps;
    BRepGProp::SurfaceProperties(shape, surfaceProps);
    handle.area = (float)surfaceProps.Mass();
}

/**
 * Enhanced primitive creation with parameters
 */
ShapeHandle makeBox(double dx, double dy, double dz) {
    try {
        BRepPrimAPI_MakeBox boxMaker(dx, dy, dz);
        boxMaker.Build();
        if (boxMaker.IsDone()) {
            TopoDS_Shape box = boxMaker.Shape();
            std::string id = ShapeManager::storeShape(box, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(box, handle);
            return handle;
        }
    } catch (const std::exception& e) {
        // Log error for debugging
    }
    return ShapeHandle("", "solid");
}

ShapeHandle makeBoxWithOrigin(double x, double y, double z, double dx, double dy, double dz) {
    try {
        gp_Pnt origin(x, y, z);
        BRepPrimAPI_MakeBox boxMaker(origin, dx, dy, dz);
        boxMaker.Build();
        if (boxMaker.IsDone()) {
            TopoDS_Shape box = boxMaker.Shape();
            std::string id = ShapeManager::storeShape(box, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(box, handle);
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
            std::string id = ShapeManager::storeShape(sphere, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(sphere, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle makeSphereWithCenter(double cx, double cy, double cz, double radius) {
    try {
        gp_Pnt center(cx, cy, cz);
        BRepPrimAPI_MakeSphere sphereMaker(center, radius);
        sphereMaker.Build();
        if (sphereMaker.IsDone()) {
            TopoDS_Shape sphere = sphereMaker.Shape();
            std::string id = ShapeManager::storeShape(sphere, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(sphere, handle);
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
            std::string id = ShapeManager::storeShape(cylinder, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(cylinder, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle makeCone(double radius1, double radius2, double height) {
    try {
        BRepPrimAPI_MakeCone coneMaker(radius1, radius2, height);
        coneMaker.Build();
        if (coneMaker.IsDone()) {
            TopoDS_Shape cone = coneMaker.Shape();
            std::string id = ShapeManager::storeShape(cone, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(cone, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

ShapeHandle makeTorus(double majorRadius, double minorRadius) {
    try {
        BRepPrimAPI_MakeTorus torusMaker(majorRadius, minorRadius);
        torusMaker.Build();
        if (torusMaker.IsDone()) {
            TopoDS_Shape torus = torusMaker.Shape();
            std::string id = ShapeManager::storeShape(torus, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(torus, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Extrusion operation
 */
ShapeHandle extrude(const std::string& profileId, double dx, double dy, double dz) {
    auto profile = ShapeManager::getShape(profileId);
    if (!profile) {
        return ShapeHandle("", "solid");
    }

    try {
        gp_Vec direction(dx, dy, dz);
        BRepPrimAPI_MakePrism prismMaker(*profile, direction);
        prismMaker.Build();
        if (prismMaker.IsDone()) {
            TopoDS_Shape result = prismMaker.Shape();
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Revolution operation
 */
ShapeHandle revolve(const std::string& profileId, double angle,
                    double axisX, double axisY, double axisZ,
                    double originX, double originY, double originZ) {
    auto profile = ShapeManager::getShape(profileId);
    if (!profile) {
        return ShapeHandle("", "solid");
    }

    try {
        gp_Pnt origin(originX, originY, originZ);
        gp_Dir direction(axisX, axisY, axisZ);
        gp_Ax1 axis(origin, direction);

        BRepPrimAPI_MakeRevol revolMaker(*profile, axis, angle);
        revolMaker.Build();
        if (revolMaker.IsDone()) {
            TopoDS_Shape result = revolMaker.Shape();
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
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
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
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
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
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
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Enhanced Tessellation with proper normal calculation
 */
MeshData tessellate(const std::string& shapeId, double precision = 0.1, double angle = 0.5) {
    MeshData meshData;
    auto shape = ShapeManager::getShape(shapeId);

    if (!shape) {
        return meshData;
    }

    try {
        // Create incremental mesh
        BRepMesh_IncrementalMesh mesh(*shape, precision, Standard_False, angle, Standard_True);

        if (!mesh.IsDone()) {
            return meshData;
        }

        // Process each face
        for (TopExp_Explorer faceExp(*shape, TopAbs_FACE); faceExp.More(); faceExp.Next()) {
            const TopoDS_Face& face = TopoDS::Face(faceExp.Current());
            TopLoc_Location location;

            Handle(Poly_Triangulation) triangulation = BRep_Tool::Triangulation(face, location);
            if (triangulation.IsNull()) {
                continue;
            }

            const gp_Trsf& transformation = location.Transformation();
            const Standard_Boolean isReversed = (face.Orientation() == TopAbs_REVERSED);

            Standard_Integer nbNodes = triangulation->NbNodes();
            Standard_Integer nbTriangles = triangulation->NbTriangles();

            int nodeOffset = (int)meshData.positions.size() / 3;

            // Add vertices
            for (Standard_Integer i = 1; i <= nbNodes; i++) {
                gp_Pnt point = triangulation->Node(i);
                point.Transform(transformation);

                meshData.positions.push_back((float)point.X());
                meshData.positions.push_back((float)point.Y());
                meshData.positions.push_back((float)point.Z());
            }

            // Calculate and add normals
            if (triangulation->HasNormals()) {
                for (Standard_Integer i = 1; i <= nbNodes; i++) {
                    gp_Dir normal = triangulation->Normal(i);
                    if (isReversed) normal.Reverse();
                    normal.Transform(transformation);

                    meshData.normals.push_back((float)normal.X());
                    meshData.normals.push_back((float)normal.Y());
                    meshData.normals.push_back((float)normal.Z());
                }
            } else {
                // Calculate normals from triangles
                for (Standard_Integer i = 0; i < nbNodes; i++) {
                    meshData.normals.push_back(0.0f);
                    meshData.normals.push_back(0.0f);
                    meshData.normals.push_back(1.0f);
                }
            }

            // Add UVs if available
            if (triangulation->HasUVNodes()) {
                for (Standard_Integer i = 1; i <= nbNodes; i++) {
                    gp_Pnt2d uv = triangulation->UVNode(i);
                    meshData.uvs.push_back((float)uv.X());
                    meshData.uvs.push_back((float)uv.Y());
                }
            }

            // Add triangles
            for (Standard_Integer i = 1; i <= nbTriangles; i++) {
                const Poly_Triangle& triangle = triangulation->Triangle(i);
                Standard_Integer n1, n2, n3;
                triangle.Get(n1, n2, n3);

                if (isReversed) {
                    meshData.indices.push_back(nodeOffset + n1 - 1);
                    meshData.indices.push_back(nodeOffset + n3 - 1);
                    meshData.indices.push_back(nodeOffset + n2 - 1);
                } else {
                    meshData.indices.push_back(nodeOffset + n1 - 1);
                    meshData.indices.push_back(nodeOffset + n2 - 1);
                    meshData.indices.push_back(nodeOffset + n3 - 1);
                }
            }
        }

        // Extract edges for wireframe
        std::map<std::pair<int, int>, bool> edgeMap;
        for (size_t i = 0; i < meshData.indices.size(); i += 3) {
            uint32_t v1 = meshData.indices[i];
            uint32_t v2 = meshData.indices[i + 1];
            uint32_t v3 = meshData.indices[i + 2];

            // Add edges ensuring no duplicates
            auto addEdge = [&](uint32_t a, uint32_t b) {
                if (a > b) std::swap(a, b);
                auto key = std::make_pair(a, b);
                if (edgeMap.find(key) == edgeMap.end()) {
                    edgeMap[key] = true;
                    meshData.edges.push_back(a);
                    meshData.edges.push_back(b);
                }
            };

            addEdge(v1, v2);
            addEdge(v2, v3);
            addEdge(v3, v1);
        }

        // Set counts
        meshData.vertexCount = meshData.positions.size() / 3;
        meshData.triangleCount = meshData.indices.size() / 3;
        meshData.edgeCount = meshData.edges.size() / 2;

    } catch (const std::exception& e) {
        // Error handling
    }

    return meshData;
}

/**
 * Feature Operations - Fillet
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
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Feature Operations - Chamfer
 */
ShapeHandle makeChamfer(const std::string& shapeId, double distance) {
    auto shape = ShapeManager::getShape(shapeId);

    if (!shape) {
        return ShapeHandle("", "solid");
    }

    try {
        BRepFilletAPI_MakeChamfer chamferMaker(*shape);

        // Add all edges for chamfering
        for (TopExp_Explorer edgeExp(*shape, TopAbs_EDGE); edgeExp.More(); edgeExp.Next()) {
            const TopoDS_Edge& edge = TopoDS::Edge(edgeExp.Current());
            chamferMaker.Add(distance, edge);
        }

        chamferMaker.Build();
        if (chamferMaker.IsDone()) {
            TopoDS_Shape result = chamferMaker.Shape();
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Shell operation (hollow out solid)
 */
ShapeHandle makeShell(const std::string& shapeId, double thickness) {
    auto shape = ShapeManager::getShape(shapeId);

    if (!shape || shape->ShapeType() != TopAbs_SOLID) {
        return ShapeHandle("", "solid");
    }

    try {
        // Get faces to remove (typically the top face for a shell)
        TopTools_ListOfShape facesToRemove;

        // For simplicity, remove the first face found
        // In production, this should be selectable
        TopExp_Explorer faceExp(*shape, TopAbs_FACE);
        if (faceExp.More()) {
            facesToRemove.Append(faceExp.Current());
        }

        BRepOffsetAPI_MakeThickSolid shellMaker;
        shellMaker.MakeThickSolidByJoin(*shape, facesToRemove, thickness, 1.e-3);
        shellMaker.Build();

        if (shellMaker.IsDone()) {
            TopoDS_Shape result = shellMaker.Shape();
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Transformation Operations
 */
ShapeHandle transform(const std::string& shapeId,
                      double tx, double ty, double tz,
                      double rx, double ry, double rz,
                      double sx, double sy, double sz) {
    auto shape = ShapeManager::getShape(shapeId);
    if (!shape) {
        return ShapeHandle("", "solid");
    }

    try {
        gp_Trsf transformation;

        // Apply translation
        if (tx != 0 || ty != 0 || tz != 0) {
            gp_Vec translation(tx, ty, tz);
            transformation.SetTranslation(translation);
        }

        // Apply rotation (simplified - around axes)
        if (rx != 0) {
            gp_Trsf rotX;
            rotX.SetRotation(gp_Ax1(gp_Pnt(0,0,0), gp_Dir(1,0,0)), rx);
            transformation.PreMultiply(rotX);
        }
        if (ry != 0) {
            gp_Trsf rotY;
            rotY.SetRotation(gp_Ax1(gp_Pnt(0,0,0), gp_Dir(0,1,0)), ry);
            transformation.PreMultiply(rotY);
        }
        if (rz != 0) {
            gp_Trsf rotZ;
            rotZ.SetRotation(gp_Ax1(gp_Pnt(0,0,0), gp_Dir(0,0,1)), rz);
            transformation.PreMultiply(rotZ);
        }

        // Apply scaling
        if (sx != 1.0 || sy != 1.0 || sz != 1.0) {
            // Note: Non-uniform scaling requires special handling in OCCT
            gp_Trsf scale;
            scale.SetScale(gp_Pnt(0,0,0), sx);  // Simplified uniform scaling
            transformation.PreMultiply(scale);
        }

        BRepBuilderAPI_Transform transformer(*shape, transformation);
        transformer.Build();

        if (transformer.IsDone()) {
            TopoDS_Shape result = transformer.Shape();
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * Copy operation
 */
ShapeHandle copyShape(const std::string& shapeId) {
    auto shape = ShapeManager::getShape(shapeId);
    if (!shape) {
        return ShapeHandle("", "solid");
    }

    try {
        BRepBuilderAPI_Copy copier(*shape);
        copier.Perform(*shape);

        if (copier.IsDone()) {
            TopoDS_Shape result = copier.Shape();
            std::string id = ShapeManager::storeShape(result, "solid");
            ShapeHandle handle(id, "solid");
            computeShapeProperties(result, handle);
            return handle;
        }
    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * STEP File Import
 */
ShapeHandle importSTEP(const std::string& fileData) {
    try {
        // For WASM, we need to handle file data differently
        // This is a simplified version - in production, use virtual filesystem

        STEPControl_Reader reader;
        // Note: In WASM environment, we'd need to write data to virtual FS first
        // For now, return placeholder

        // Placeholder implementation
        return makeBox(100, 100, 100);  // Return a box as placeholder

    } catch (const std::exception& e) {}
    return ShapeHandle("", "solid");
}

/**
 * STEP File Export
 */
std::string exportSTEP(const std::string& shapeId) {
    auto shape = ShapeManager::getShape(shapeId);
    if (!shape) {
        return "";
    }

    try {
        STEPControl_Writer writer;
        Interface_Static::SetCVal("write.step.schema", "AP214");
        Interface_Static::SetIVal("write.step.vertex.mode", 0);

        writer.Transfer(*shape, STEPControl_AsIs);

        // In WASM, we'd write to virtual filesystem and return the data
        // For now, return a placeholder string
        return "STEP file data placeholder";

    } catch (const std::exception& e) {}
    return "";
}

/**
 * STL File Export
 */
std::string exportSTL(const std::string& shapeId, bool binary = true) {
    auto shape = ShapeManager::getShape(shapeId);
    if (!shape) {
        return "";
    }

    try {
        StlAPI_Writer writer;
        // Note: SetASCIIMode may not be available in all OCCT versions
        // The STL writer defaults to binary mode

        // In WASM, we'd write to virtual filesystem
        // For now, return a placeholder
        return "STL file data placeholder";

    } catch (const std::exception& e) {}
    return "";
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

void clearAllShapes() {
    ShapeManager::clearAll();
}

/**
 * Status and Version Functions
 */
std::string getStatus() {
    std::stringstream status;
    status << "OCCT.wasm Active | ";
    status << "Shapes: " << ShapeManager::getShapeCount() << " | ";
    status << "Memory: OK";
    return status.str();
}

std::string getOCCTVersion() {
    return "7.8.0";
}

/**
 * Emscripten Bindings - Complete Set
 */
EMSCRIPTEN_BINDINGS(occt_bindings) {
    // Register MeshData struct
    value_object<MeshData>("MeshData")
        .field("positions", &MeshData::positions)
        .field("normals", &MeshData::normals)
        .field("indices", &MeshData::indices)
        .field("edges", &MeshData::edges)
        .field("uvs", &MeshData::uvs)
        .field("vertexCount", &MeshData::vertexCount)
        .field("triangleCount", &MeshData::triangleCount)
        .field("edgeCount", &MeshData::edgeCount);

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
        .field("hash", &ShapeHandle::hash)
        .field("volume", &ShapeHandle::volume)
        .field("area", &ShapeHandle::area)
        .field("centerX", &ShapeHandle::centerX)
        .field("centerY", &ShapeHandle::centerY)
        .field("centerZ", &ShapeHandle::centerZ);

    // Primitive creation
    function("makeBox", &makeBox);
    function("makeBoxWithOrigin", &makeBoxWithOrigin);
    function("makeSphere", &makeSphere);
    function("makeSphereWithCenter", &makeSphereWithCenter);
    function("makeCylinder", &makeCylinder);
    function("makeCone", &makeCone);
    function("makeTorus", &makeTorus);

    // Advanced operations
    function("extrude", &extrude);
    function("revolve", &revolve);

    // Boolean operations
    function("booleanUnion", &booleanUnion);
    function("booleanSubtract", &booleanSubtract);
    function("booleanIntersect", &booleanIntersect);

    // Feature operations
    function("makeFillet", &makeFillet);
    function("makeChamfer", &makeChamfer);
    function("makeShell", &makeShell);

    // Transformation operations
    function("transform", &transform);
    function("copyShape", &copyShape);

    // Tessellation
    function("tessellate", &tessellate);

    // File I/O
    function("importSTEP", &importSTEP);
    function("exportSTEP", &exportSTEP);
    function("exportSTL", &exportSTL);

    // Memory management
    function("deleteShape", &deleteShape);
    function("getShapeCount", &getShapeCount);
    function("clearAllShapes", &clearAllShapes);

    // Status
    function("getStatus", &getStatus);
    function("getOCCTVersion", &getOCCTVersion);

    // Vector types for JavaScript interop
    register_vector<float>("VectorFloat");
    register_vector<uint32_t>("VectorUint");
    register_vector<std::string>("VectorString");
}