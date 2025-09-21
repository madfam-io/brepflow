/**
 * Auto-generated Node Index
 * Generated from templates on 2025-09-18T12:24:37.925Z
 */

import { SimpleHoleNode } from './features/holes/simple-hole.node.js';
import { CounterboreHoleNode } from './features/holes/counterbore-hole.node.js';
import { CountersinkHoleNode } from './features/holes/countersink-hole.node.js';
import { ThreadedHoleNode } from './features/holes/threaded-hole.node.js';
import { RectangularPocketNode } from './features/pockets/rectangular-pocket.node.js';
import { CircularPocketNode } from './features/pockets/circular-pocket.node.js';
import { LinearRibNode } from './features/structural/linear-rib.node.js';
import { MountingBossNode } from './features/structural/mounting-boss.node.js';
import { LinearPatternNode } from './transform/patterns/linear-pattern.node.js';
import { CircularPatternNode } from './transform/patterns/circular-pattern.node.js';
import { RectangularPatternNode } from './transform/patterns/rectangular-pattern.node.js';
import { MoveNode } from './transform/move.node.js';
import { RotateNode } from './transform/rotate.node.js';
import { ScaleNode } from './transform/scale.node.js';
import { MirrorNode } from './transform/mirror.node.js';
import { LinearArrayNode } from './transform/linear-array.node.js';
import { PolarArrayNode } from './transform/polar-array.node.js';
import { PathArrayNode } from './transform/path-array.node.js';
import { GridArrayNode } from './transform/grid-array.node.js';
import { AlignNode } from './transform/align.node.js';
import { OrientNode } from './transform/orient.node.js';
import { ProjectToPlaneNode } from './transform/project-to-plane.node.js';
import { WrapNode } from './transform/wrap.node.js';
import { DeformNode } from './transform/deform.node.js';
import { BoundingBoxAlignNode } from './transform/bounding-box-align.node.js';
import { MatrixTransformNode } from './transform/matrix-transform.node.js';
import { PrismNode } from './solid/parametric/prism.node.js';
import { WedgeNode } from './solid/parametric/wedge.node.js';
import { PyramidNode } from './solid/parametric/pyramid.node.js';
import { BezierSurfaceNode } from './solid/surface/bezier-surface.node.js';
import { BSplineSurfaceNode } from './solid/surface/b-spline-surface.node.js';
import { RuledSurfaceNode } from './solid/surface/ruled-surface.node.js';
import { HelixNode } from './solid/helical/helix.node.js';
import { SpringNode } from './solid/helical/spring.node.js';
import { ThreadNode } from './solid/helical/thread.node.js';
import { BoxNode } from './solid/primitives/box.node.js';
import { SphereNode } from './solid/primitives/sphere.node.js';
import { CylinderNode } from './solid/primitives/cylinder.node.js';
import { ConeNode } from './solid/primitives/cone.node.js';
import { TorusNode } from './solid/primitives/torus.node.js';
import { EllipsoidNode } from './solid/primitives/ellipsoid.node.js';
import { CapsuleNode } from './solid/primitives/capsule.node.js';
import { RoundedBoxNode } from './solid/primitives/rounded-box.node.js';
import { PipeNode } from './solid/primitives/pipe.node.js';
import { PolyhedronNode } from './solid/primitives/polyhedron.node.js';
import { EllipseNode } from './sketch/curves/ellipse.node.js';
import { ParabolaNode } from './sketch/curves/parabola.node.js';
import { HyperbolaNode } from './sketch/curves/hyperbola.node.js';
import { SpiralNode } from './sketch/curves/spiral.node.js';
import { PolygonNode } from './sketch/patterns/polygon.node.js';
import { StarNode } from './sketch/patterns/star.node.js';
import { GearNode } from './sketch/patterns/gear.node.js';
import { LineNode } from './sketch/basic/line.node.js';
import { ArcNode } from './sketch/basic/arc.node.js';
import { CircleNode } from './sketch/basic/circle.node.js';
import { RectangleNode } from './sketch/basic/rectangle.node.js';
import { PolylineNode } from './sketch/basic/polyline.node.js';
import { SplineNode } from './sketch/curves/spline.node.js';
import { BezierCurveNode } from './sketch/curves/bezier-curve.node.js';
import { BSplineCurveNode } from './sketch/curves/b-spline-curve.node.js';
import { PointNode } from './sketch/basic/point.node.js';
import { SlotNode } from './sketch/basic/slot.node.js';
import { TextNode } from './sketch/basic/text.node.js';
import { OffsetNode } from './sketch/curves/offset.node.js';
import { Fillet2DNode } from './sketch/curves/fillet2-d.node.js';
import { Chamfer2DNode } from './sketch/curves/chamfer2-d.node.js';
import { TrimNode } from './sketch/curves/trim.node.js';
import { UnionNode } from './boolean/union.node.js';
import { DifferenceNode } from './boolean/difference.node.js';
import { IntersectionNode } from './boolean/intersection.node.js';
import { XORNode } from './boolean/x-o-r.node.js';
import { SplitNode } from './boolean/split.node.js';
import { FragmentNode } from './boolean/fragment.node.js';
import { CommonEdgesNode } from './boolean/common-edges.node.js';
import { ImprintNode } from './boolean/imprint.node.js';
import { GlueNode } from './boolean/glue.node.js';
import { CompoundNode } from './boolean/compound.node.js';
import { CoincidentNode } from './assembly/constraints/coincident.node.js';
import { ParallelNode } from './assembly/constraints/parallel.node.js';
import { PerpendicularNode } from './assembly/constraints/perpendicular.node.js';
import { TangentNode } from './assembly/constraints/tangent.node.js';
import { ConcentricNode } from './assembly/constraints/concentric.node.js';
import { DistanceNode } from './assembly/constraints/distance.node.js';
import { AngleNode } from './assembly/constraints/angle.node.js';
import { HorizontalNode } from './assembly/constraints/horizontal.node.js';
import { VerticalNode } from './assembly/constraints/vertical.node.js';
import { FixedNode } from './assembly/constraints/fixed.node.js';
import { FaceToFaceNode } from './assembly/mates/face-to-face.node.js';
import { EdgeToEdgeNode } from './assembly/mates/edge-to-edge.node.js';
import { PointToPointNode } from './assembly/mates/point-to-point.node.js';
import { AxisToAxisNode } from './assembly/mates/axis-to-axis.node.js';
import { PlaneToPlaneNode } from './assembly/mates/plane-to-plane.node.js';
import { FastenedNode } from './assembly/mates/fastened.node.js';
import { GearNode as AssemblyGearNode } from './assembly/mates/gear.node.js';
import { CamNode } from './assembly/mates/cam.node.js';
import { SlotNode as AssemblyMatesSlotNode } from './assembly/mates/slot.node.js';
import { PathNode } from './assembly/mates/path.node.js';
import { RevoluteNode } from './assembly/joints/revolute.node.js';
import { PrismaticNode } from './assembly/joints/prismatic.node.js';
import { CylindricalNode } from './assembly/joints/cylindrical.node.js';
import { SphericalNode } from './assembly/joints/spherical.node.js';
import { PlanarNode } from './assembly/joints/planar.node.js';
import { UniversalNode } from './assembly/joints/universal.node.js';
import { FixedNode as AssemblyJointsFixedNode } from './assembly/joints/fixed.node.js';
import { ScrewNode } from './assembly/joints/screw.node.js';
import { BeltNode } from './assembly/joints/belt.node.js';
import { RackPinionNode } from './assembly/joints/rack-pinion.node.js';
import { ComponentPatternNode } from './assembly/patterns/component-pattern.node.js';
import { FlexibleSubAssemblyNode } from './assembly/patterns/flexible-sub-assembly.node.js';
import { ConfigurationNode } from './assembly/patterns/configuration.node.js';
import { ExplodedViewNode } from './assembly/patterns/exploded-view.node.js';
import { BillOfMaterialsNode } from './assembly/patterns/bill-of-materials.node.js';
import { InterferenceCheckNode } from './assembly/patterns/interference-check.node.js';
import { MotionStudyNode } from './assembly/patterns/motion-study.node.js';
import { EnvelopeNode } from './assembly/patterns/envelope.node.js';
import { SmartFastenersNode } from './assembly/patterns/smart-fasteners.node.js';
import { ContactSetNode } from './assembly/patterns/contact-set.node.js';
import { EdgeFlangeNode } from './sheetmetal/flanges/edge-flange.node.js';
import { ContourFlangeNode } from './sheetmetal/flanges/contour-flange.node.js';
import { MiterFlangeNode } from './sheetmetal/flanges/miter-flange.node.js';
import { SketchedBendNode } from './sheetmetal/bends/sketched-bend.node.js';
import { HemNode } from './sheetmetal/bends/hem.node.js';
import { JogNode } from './sheetmetal/bends/jog.node.js';
import { CornerReliefNode } from './sheetmetal/corners/corner-relief.node.js';
import { BendReliefNode } from './sheetmetal/corners/bend-relief.node.js';
import { ClosedCornerNode } from './sheetmetal/corners/closed-corner.node.js';
import { TabNode } from './sheetmetal/features/tab.node.js';
import { SlotNode as SheetMetalSlotNode } from './sheetmetal/features/slot.node.js';
import { LouverNode } from './sheetmetal/features/louver.node.js';
import { LanceNode } from './sheetmetal/features/lance.node.js';
import { BeadNode } from './sheetmetal/features/bead.node.js';
import { UnfoldNode } from './sheetmetal/unfold/unfold.node.js';
import { FoldNode } from './sheetmetal/unfold/fold.node.js';
import { ExportDXFNode } from './sheetmetal/unfold/export-d-x-f.node.js';
import { SheetMetalStyleNode } from './sheetmetal/properties/sheet-metal-style.node.js';
import { BendTableNode } from './sheetmetal/properties/bend-table.node.js';
import { CostEstimateNode } from './sheetmetal/properties/cost-estimate.node.js';
import { SweepNode } from './advanced/sweep/sweep.node.js';
import { HelicalSweepNode } from './advanced/sweep/helical-sweep.node.js';
import { LoftNode } from './advanced/loft/loft.node.js';
import { BlendSurfaceNode } from './advanced/loft/blend-surface.node.js';
import { BoundaryNode } from './advanced/boundary/boundary.node.js';
import { ShellNode } from './advanced/shell/shell.node.js';
import { VariableShellNode } from './advanced/shell/variable-shell.node.js';
import { ThickenNode } from './advanced/thickness/thicken.node.js';
import { OffsetSurfaceNode } from './advanced/thickness/offset-surface.node.js';
import { DraftNode } from './advanced/draft/draft.node.js';
import { PartingLineDraftNode } from './advanced/draft/parting-line-draft.node.js';
import { StepDraftNode } from './advanced/draft/step-draft.node.js';
import { TrimSurfaceNode } from './advanced/surface/trim-surface.node.js';
import { ExtendSurfaceNode } from './advanced/surface/extend-surface.node.js';
import { UntrimSurfaceNode } from './advanced/surface/untrim-surface.node.js';
import { KnitSurfacesNode } from './advanced/surface/knit-surfaces.node.js';
import { PatchSurfaceNode } from './advanced/surface/patch-surface.node.js';
import { WrapNode as AdvancedWrapNode } from './advanced/features/wrap.node.js';
import { DomeNode } from './advanced/features/dome.node.js';
import { FlexNode } from './advanced/features/flex.node.js';
import { IndentNode } from './advanced/features/indent.node.js';
import { DeformNode as AdvancedDeformNode } from './advanced/features/deform.node.js';
import { HealShapeNode } from './advanced/healing/heal-shape.node.js';
import { RemoveFeaturesNode } from './advanced/healing/remove-features.node.js';
import { DeleteFaceNode } from './advanced/healing/delete-face.node.js';
import { SimplifyShapeNode } from './advanced/healing/simplify-shape.node.js';
import { CheckGeometryNode } from './advanced/healing/check-geometry.node.js';
import { NurbsSurfaceNode } from './surface/nurbs/nurbs-surface.node.js';
import { NetworkSurfaceNode } from './surface/nurbs/network-surface.node.js';
import { SurfaceFromPointsNode } from './surface/nurbs/surface-from-points.node.js';
import { CoonsPatchNode } from './surface/nurbs/coons-patch.node.js';
import { GordonSurfaceNode } from './surface/nurbs/gordon-surface.node.js';
import { NurbsCurveNode } from './surface/curves/nurbs-curve.node.js';
import { InterpolateCurveNode } from './surface/curves/interpolate-curve.node.js';
import { ApproximateCurveNode } from './surface/curves/approximate-curve.node.js';
import { BlendCurveNode } from './surface/curves/blend-curve.node.js';
import { CompositeCurveNode } from './surface/curves/composite-curve.node.js';
import { CurvatureAnalysisNode } from './surface/analysis/curvature-analysis.node.js';
import { ZebraAnalysisNode } from './surface/analysis/zebra-analysis.node.js';
import { DraftAnalysisNode } from './surface/analysis/draft-analysis.node.js';
import { ContinuityCheckNode } from './surface/analysis/continuity-check.node.js';
import { SurfaceDeviationNode } from './surface/analysis/surface-deviation.node.js';
import { ReflectionLinesNode } from './surface/analysis/reflection-lines.node.js';
import { IsocurveExtractNode } from './surface/analysis/isocurve-extract.node.js';
import { SectionCurvesNode } from './surface/analysis/section-curves.node.js';
import { ProjectCurveNode } from './surface/curveops/project-curve.node.js';
import { IntersectCurvesNode } from './surface/curveops/intersect-curves.node.js';
import { CurveOnSurfaceNode } from './surface/curveops/curve-on-surface.node.js';
import { GeodesicCurveNode } from './surface/curveops/geodesic-curve.node.js';
import { IsoparametricCurveNode } from './surface/curveops/isoparametric-curve.node.js';
import { TessellateNode } from './mesh/tessellation/tessellate.node.js';
import { AdaptiveTessellationNode } from './mesh/tessellation/adaptive-tessellation.node.js';
import { RemeshUniformNode } from './mesh/tessellation/remesh-uniform.node.js';
import { QuadMeshNode } from './mesh/tessellation/quad-mesh.node.js';
import { VoxelMeshNode } from './mesh/tessellation/voxel-mesh.node.js';
import { RepairMeshNode } from './mesh/repair/repair-mesh.node.js';
import { SimplifyMeshNode } from './mesh/repair/simplify-mesh.node.js';
import { FillHolesNode } from './mesh/repair/fill-holes.node.js';
import { SmoothMeshNode } from './mesh/repair/smooth-mesh.node.js';
import { DecimateMeshNode } from './mesh/repair/decimate-mesh.node.js';
import { SubdivideMeshNode } from './mesh/repair/subdivide-mesh.node.js';
import { MeshBooleanNode } from './mesh/repair/mesh-boolean.node.js';
import { MeshOffsetNode } from './mesh/repair/mesh-offset.node.js';
import { ImportSTLNode } from './mesh/files/import-s-t-l.node.js';
import { ExportSTLNode } from './mesh/files/export-s-t-l.node.js';
import { ImportOBJNode } from './mesh/files/import-o-b-j.node.js';
import { ExportOBJNode } from './mesh/files/export-o-b-j.node.js';
import { ImportPLYNode } from './mesh/files/import-p-l-y.node.js';
import { Export3MFNode } from './mesh/files/export3-m-f.node.js';
import { MeshToShapeNode } from './mesh/files/mesh-to-shape.node.js';
import { ImportSTEPNode } from './io/cad/import-s-t-e-p.node.js';
import { ExportSTEPNode } from './io/cad/export-s-t-e-p.node.js';
import { ImportIGESNode } from './io/cad/import-i-g-e-s.node.js';
import { ExportIGESNode } from './io/cad/export-i-g-e-s.node.js';
import { ImportBREPNode } from './io/cad/import-b-r-e-p.node.js';
import { ExportBREPNode } from './io/cad/export-b-r-e-p.node.js';
import { ImportParasolidNode } from './io/cad/import-parasolid.node.js';
import { ImportACISNode } from './io/cad/import-a-c-i-s.node.js';
import { ImportDXFNode } from './io/drawing/import-d-x-f.node.js';
import { ExportDXFNode as DrawingExportDXFNode } from './io/drawing/export-d-x-f.node.js';
import { ExportSVGNode } from './io/drawing/export-s-v-g.node.js';
import { ImportGLTFNode } from './io/exchange/import-g-l-t-f.node.js';
import { ExportGLTFNode } from './io/exchange/export-g-l-t-f.node.js';
import { ImportJSONNode } from './io/exchange/import-j-s-o-n.node.js';
import { ExportJSONNode } from './io/exchange/export-j-s-o-n.node.js';
import { Text3DNode } from './specialized/text/text3-d.node.js';
import { EngraveNode } from './specialized/text/engrave.node.js';
import { EmbossNode } from './specialized/text/emboss.node.js';
import { SerialNumberNode } from './specialized/text/serial-number.node.js';
import { BarcodeNode } from './specialized/text/barcode.node.js';
import { LatticeStructureNode } from './specialized/lattice/lattice-structure.node.js';
import { TPMSNode } from './specialized/lattice/t-p-m-s.node.js';
import { VoronoiLatticeNode } from './specialized/lattice/voronoi-lattice.node.js';
import { GradedLatticeNode } from './specialized/lattice/graded-lattice.node.js';
import { ConformLatticeNode } from './specialized/lattice/conform-lattice.node.js';
import { HoneycombStructureNode } from './specialized/lattice/honeycomb-structure.node.js';
import { TopologyOptimizeNode } from './specialized/optimization/topology-optimize.node.js';
import { ShapeOptimizeNode } from './specialized/optimization/shape-optimize.node.js';
import { GenerativeDesignNode } from './specialized/optimization/generative-design.node.js';
import { LightweightStructureNode } from './specialized/optimization/lightweight-structure.node.js';
import { StressReliefNode } from './specialized/optimization/stress-relief.node.js';
import { PackingOptimizeNode } from './specialized/optimization/packing-optimize.node.js';
import { MetaBallsNode } from './specialized/organic/meta-balls.node.js';
import { SubdivisionSurfaceNode } from './specialized/organic/subdivision-surface.node.js';
import { FractalGeometryNode } from './specialized/organic/fractal-geometry.node.js';
import { ReactionDiffusionNode } from './specialized/organic/reaction-diffusion.node.js';
import { BiomimeticStructureNode } from './specialized/organic/biomimetic-structure.node.js';
import { MeshForFEANode } from './simulation/fea/mesh-for-f-e-a.node.js';
import { ApplyLoadsNode } from './simulation/fea/apply-loads.node.js';
import { ApplyConstraintsNode } from './simulation/fea/apply-constraints.node.js';
import { MaterialAssignNode } from './simulation/fea/material-assign.node.js';
import { ExportFEANode } from './simulation/fea/export-f-e-a.node.js';
import { FluidDomainNode } from './simulation/cfd/fluid-domain.node.js';
import { BoundaryLayersNode } from './simulation/cfd/boundary-layers.node.js';
import { InletOutletNode } from './simulation/cfd/inlet-outlet.node.js';
import { FluidPropertiesNode } from './simulation/cfd/fluid-properties.node.js';
import { ExportCFDNode } from './simulation/cfd/export-c-f-d.node.js';
import { JointDefinitionNode } from './simulation/kinematics/joint-definition.node.js';
import { MotionDriverNode } from './simulation/kinematics/motion-driver.node.js';
import { CollisionDetectionNode } from './simulation/kinematics/collision-detection.node.js';
import { ForwardKinematicsNode } from './simulation/kinematics/forward-kinematics.node.js';
import { InverseKinematicsNode } from './simulation/kinematics/inverse-kinematics.node.js';
import { AddNode } from './math/operators/add.node.js';
import { SubtractNode } from './math/operators/subtract.node.js';
import { MultiplyNode } from './math/operators/multiply.node.js';
import { DivideNode } from './math/operators/divide.node.js';
import { PowerNode } from './math/operators/power.node.js';
import { ModuloNode } from './math/operators/modulo.node.js';
import { AbsoluteNode } from './math/operators/absolute.node.js';
import { NegateNode } from './math/operators/negate.node.js';
import { SquareRootNode } from './math/operators/square-root.node.js';
import { FactorialNode } from './math/operators/factorial.node.js';
import { SineNode } from './math/trigonometry/sine.node.js';
import { CosineNode } from './math/trigonometry/cosine.node.js';
import { TangentNode as MathTangentNode } from './math/trigonometry/tangent.node.js';
import { ArcSineNode } from './math/trigonometry/arc-sine.node.js';
import { ArcCosineNode } from './math/trigonometry/arc-cosine.node.js';
import { ArcTangentNode } from './math/trigonometry/arc-tangent.node.js';
import { ArcTangent2Node } from './math/trigonometry/arc-tangent2.node.js';
import { HyperbolicSineNode } from './math/trigonometry/hyperbolic-sine.node.js';
import { HyperbolicCosineNode } from './math/trigonometry/hyperbolic-cosine.node.js';
import { HyperbolicTangentNode } from './math/trigonometry/hyperbolic-tangent.node.js';
import { NaturalLogNode } from './math/logarithmic/natural-log.node.js';
import { Log10Node } from './math/logarithmic/log10.node.js';
import { LogBaseNode } from './math/logarithmic/log-base.node.js';
import { ExponentialNode } from './math/logarithmic/exponential.node.js';
import { Exp10Node } from './math/logarithmic/exp10.node.js';
import { RoundNode } from './math/rounding/round.node.js';
import { FloorNode } from './math/rounding/floor.node.js';
import { CeilingNode } from './math/rounding/ceiling.node.js';
import { TruncateNode } from './math/rounding/truncate.node.js';
import { RoundToDecimalNode } from './math/rounding/round-to-decimal.node.js';
import { MinNode } from './math/comparison/min.node.js';
import { MaxNode } from './math/comparison/max.node.js';
import { ClampNode } from './math/comparison/clamp.node.js';
import { SignNode } from './math/comparison/sign.node.js';
import { IsEqualNode } from './math/comparison/is-equal.node.js';
import { AverageNode } from './math/statistics/average.node.js';
import { MedianNode } from './math/statistics/median.node.js';
import { ModeNode } from './math/statistics/mode.node.js';
import { StandardDeviationNode } from './math/statistics/standard-deviation.node.js';
import { VarianceNode } from './math/statistics/variance.node.js';
import { SumNode } from './math/statistics/sum.node.js';
import { ProductNode } from './math/statistics/product.node.js';
import { RangeNode } from './math/statistics/range.node.js';
import { PercentileNode } from './math/statistics/percentile.node.js';
import { CorrelationNode } from './math/statistics/correlation.node.js';
import { RandomNode } from './math/random/random.node.js';
import { RandomRangeNode } from './math/random/random-range.node.js';
import { RandomIntegerNode } from './math/random/random-integer.node.js';
import { RandomNormalNode } from './math/random/random-normal.node.js';
import { RandomPoissonNode } from './math/random/random-poisson.node.js';
import { RandomExponentialNode } from './math/random/random-exponential.node.js';
import { RandomChoiceNode } from './math/random/random-choice.node.js';
import { ShuffleNode } from './math/random/shuffle.node.js';
import { PerlinNoiseNode } from './math/random/perlin-noise.node.js';
import { SimplexNoiseNode } from './math/random/simplex-noise.node.js';
import { LerpNode } from './math/interpolation/lerp.node.js';
import { InverseLerpNode } from './math/interpolation/inverse-lerp.node.js';
import { RemapNode } from './math/interpolation/remap.node.js';
import { SmoothStepNode } from './math/interpolation/smooth-step.node.js';
import { SmootherStepNode } from './math/interpolation/smoother-step.node.js';
import { CubicInterpNode } from './math/interpolation/cubic-interp.node.js';
import { HermiteInterpNode } from './math/interpolation/hermite-interp.node.js';
import { BezierInterpNode } from './math/interpolation/bezier-interp.node.js';
import { EaseInNode } from './math/interpolation/ease-in.node.js';
import { EaseOutNode } from './math/interpolation/ease-out.node.js';
import { EaseInOutNode } from './math/interpolation/ease-in-out.node.js';
import { SpringInterpNode } from './math/interpolation/spring-interp.node.js';
import { ComplexNumberNode } from './math/complex/complex-number.node.js';
import { ComplexAddNode } from './math/complex/complex-add.node.js';
import { ComplexMultiplyNode } from './math/complex/complex-multiply.node.js';
import { ComplexConjugateNode } from './math/complex/complex-conjugate.node.js';
import { ComplexMagnitudeNode } from './math/complex/complex-magnitude.node.js';
import { ComplexPhaseNode } from './math/complex/complex-phase.node.js';
import { MatrixMultiplyNode } from './math/matrix/matrix-multiply.node.js';
import { MatrixInverseNode } from './math/matrix/matrix-inverse.node.js';
import { MatrixDeterminantNode } from './math/matrix/matrix-determinant.node.js';
import { MatrixTransposeNode } from './math/matrix/matrix-transpose.node.js';
import { ListLengthNode } from './data/list/list-length.node.js';
import { ListItemNode } from './data/list/list-item.node.js';
import { ListSliceNode } from './data/list/list-slice.node.js';
import { ListReverseNode } from './data/list/list-reverse.node.js';
import { ListSortNode } from './data/list/list-sort.node.js';
import { ListShuffleNode } from './data/list/list-shuffle.node.js';
import { ListShiftNode } from './data/list/list-shift.node.js';
import { ListInsertNode } from './data/list/list-insert.node.js';
import { ListRemoveNode } from './data/list/list-remove.node.js';
import { ListReplaceNode } from './data/list/list-replace.node.js';
import { ListAppendNode } from './data/list/list-append.node.js';
import { ListPrependNode } from './data/list/list-prepend.node.js';
import { ListJoinNode } from './data/list/list-join.node.js';
import { ListSplitNode } from './data/list/list-split.node.js';
import { ListPartitionNode } from './data/list/list-partition.node.js';
import { ListFlattenNode } from './data/list/list-flatten.node.js';
import { ListUniqueNode } from './data/list/list-unique.node.js';
import { ListContainsNode } from './data/list/list-contains.node.js';
import { ListFindNode } from './data/list/list-find.node.js';
import { ListFilterNode } from './data/list/list-filter.node.js';
import { SetUnionNode } from './data/set/set-union.node.js';
import { SetIntersectionNode } from './data/set/set-intersection.node.js';
import { SetDifferenceNode } from './data/set/set-difference.node.js';
import { SetSymmetricDifferenceNode } from './data/set/set-symmetric-difference.node.js';
import { SetSubsetNode } from './data/set/set-subset.node.js';
import { SetCartesianProductNode } from './data/set/set-cartesian-product.node.js';
import { SetPowerSetNode } from './data/set/set-power-set.node.js';
import { SetCombinationsNode } from './data/set/set-combinations.node.js';
import { SetPermutationsNode } from './data/set/set-permutations.node.js';
import { SetPartitionsNode } from './data/set/set-partitions.node.js';
import { TreeBranchNode } from './data/tree/tree-branch.node.js';
import { TreePathsNode } from './data/tree/tree-paths.node.js';
import { TreeGraftNode } from './data/tree/tree-graft.node.js';
import { TreeFlattenNode } from './data/tree/tree-flatten.node.js';
import { TreeSimplifyNode } from './data/tree/tree-simplify.node.js';
import { TreePruneNode } from './data/tree/tree-prune.node.js';
import { TreeMergeNode } from './data/tree/tree-merge.node.js';
import { TreeExplodeNode } from './data/tree/tree-explode.node.js';
import { TreeShiftNode } from './data/tree/tree-shift.node.js';
import { TreeStatisticsNode } from './data/tree/tree-statistics.node.js';
import { StringConcatNode } from './data/string/string-concat.node.js';
import { StringSplitNode } from './data/string/string-split.node.js';
import { StringReplaceNode } from './data/string/string-replace.node.js';
import { StringFormatNode } from './data/string/string-format.node.js';
import { StringCaseNode } from './data/string/string-case.node.js';
import { StringTrimNode } from './data/string/string-trim.node.js';
import { StringLengthNode } from './data/string/string-length.node.js';
import { StringSubstringNode } from './data/string/string-substring.node.js';
import { StringContainsNode } from './data/string/string-contains.node.js';
import { StringMatchNode } from './data/string/string-match.node.js';
import { ToStringNode } from './data/convert/to-string.node.js';
import { ToNumberNode } from './data/convert/to-number.node.js';
import { ToBooleanNode } from './data/convert/to-boolean.node.js';
import { ToJSONNode } from './data/convert/to-j-s-o-n.node.js';
import { FromJSONNode } from './data/convert/from-j-s-o-n.node.js';
import { ToCSVNode } from './data/convert/to-c-s-v.node.js';
import { FromCSVNode } from './data/convert/from-c-s-v.node.js';
import { ToBase64Node } from './data/convert/to-base64.node.js';
import { FromBase64Node } from './data/convert/from-base64.node.js';
import { TypeOfNode } from './data/convert/type-of.node.js';
import { LinearFieldNode } from './field/generate/linear-field.node.js';
import { RadialFieldNode } from './field/generate/radial-field.node.js';
import { SphericalFieldNode } from './field/generate/spherical-field.node.js';
import { CylindricalFieldNode } from './field/generate/cylindrical-field.node.js';
import { NoiseFieldNode } from './field/generate/noise-field.node.js';
import { SineFieldNode } from './field/generate/sine-field.node.js';
import { VectorFieldNode } from './field/generate/vector-field.node.js';
import { ImageFieldNode } from './field/generate/image-field.node.js';
import { DistanceFieldNode } from './field/generate/distance-field.node.js';
import { ChargeFieldNode } from './field/generate/charge-field.node.js';
import { PointAttractorNode } from './field/attractor/point-attractor.node.js';
import { CurveAttractorNode } from './field/attractor/curve-attractor.node.js';
import { SurfaceAttractorNode } from './field/attractor/surface-attractor.node.js';
import { MeshAttractorNode } from './field/attractor/mesh-attractor.node.js';
import { SpinAttractorNode } from './field/attractor/spin-attractor.node.js';
import { DirectionalAttractorNode } from './field/attractor/directional-attractor.node.js';
import { TwistAttractorNode } from './field/attractor/twist-attractor.node.js';
import { VortexAttractorNode } from './field/attractor/vortex-attractor.node.js';
import { GravityAttractorNode } from './field/attractor/gravity-attractor.node.js';
import { FlowAttractorNode } from './field/attractor/flow-attractor.node.js';
import { FieldAddNode } from './field/operations/field-add.node.js';
import { FieldSubtractNode } from './field/operations/field-subtract.node.js';
import { FieldMultiplyNode } from './field/operations/field-multiply.node.js';
import { FieldDivideNode } from './field/operations/field-divide.node.js';
import { FieldMinNode } from './field/operations/field-min.node.js';
import { FieldMaxNode } from './field/operations/field-max.node.js';
import { FieldBlendNode } from './field/operations/field-blend.node.js';
import { FieldRemapNode } from './field/operations/field-remap.node.js';
import { FieldClampNode } from './field/operations/field-clamp.node.js';
import { FieldInvertNode } from './field/operations/field-invert.node.js';
import { FieldGradientNode } from './field/operations/field-gradient.node.js';
import { FieldDivergenceNode } from './field/operations/field-divergence.node.js';
import { FieldCurlNode } from './field/operations/field-curl.node.js';
import { FieldLaplacianNode } from './field/operations/field-laplacian.node.js';
import { FieldSmoothNode } from './field/operations/field-smooth.node.js';
import { SampleFieldNode } from './field/sample/sample-field.node.js';
import { FieldLineNode } from './field/sample/field-line.node.js';
import { IsoContourNode } from './field/sample/iso-contour.node.js';
import { IsoSurfaceNode } from './field/sample/iso-surface.node.js';
import { FieldGridNode } from './field/sample/field-grid.node.js';
import { FieldDeformNode } from './field/deform/field-deform.node.js';
import { FieldDisplaceNode } from './field/deform/field-displace.node.js';
import { FieldScaleNode } from './field/deform/field-scale.node.js';
import { FieldRotateNode } from './field/deform/field-rotate.node.js';
import { FieldColorNode } from './field/deform/field-color.node.js';
import { FieldColorMapNode } from './fields/visualization/field-color-map.node.js';
import { FieldVectorArrowsNode } from './fields/visualization/field-vector-arrows.node.js';
import { FieldStreamLinesNode } from './fields/visualization/field-stream-lines.node.js';
import { FieldHeatMapNode } from './fields/visualization/field-heat-map.node.js';
import { FieldVolumeNode } from './fields/visualization/field-volume.node.js';
import { FieldMinMaxNode } from './fields/analysis/field-min-max.node.js';
import { FieldAverageNode } from './fields/analysis/field-average.node.js';
import { FieldCriticalPointsNode } from './fields/analysis/field-critical-points.node.js';
import { FieldDivergenceAnalysisNode } from './fields/analysis/field-divergence-analysis.node.js';
import { FieldCurlAnalysisNode } from './fields/analysis/field-curl-analysis.node.js';
import { FieldFluxNode } from './fields/analysis/field-flux.node.js';
import { FieldCirculationNode } from './fields/analysis/field-circulation.node.js';
import { FieldPotentialNode } from './fields/analysis/field-potential.node.js';
import { FieldHistogramNode } from './fields/analysis/field-histogram.node.js';
import { FieldCorrelationNode } from './fields/analysis/field-correlation.node.js';
import { FieldMorphingNode } from './fields/advanced/field-morphing.node.js';
import { FieldWarpNode } from './fields/advanced/field-warp.node.js';
import { FieldConvolutionNode } from './fields/advanced/field-convolution.node.js';
import { FieldFourierNode } from './fields/advanced/field-fourier.node.js';
import { FieldOptimizeNode } from './fields/advanced/field-optimize.node.js';
import { Voronoi2DNode } from './patterns/voronoi/voronoi2-d.node.js';
import { Voronoi3DNode } from './patterns/voronoi/voronoi3-d.node.js';
import { WeightedVoronoiNode } from './patterns/voronoi/weighted-voronoi.node.js';
import { CentroidalVoronoiNode } from './patterns/voronoi/centroidal-voronoi.node.js';
import { VoronoiOnSurfaceNode } from './patterns/voronoi/voronoi-on-surface.node.js';
import { Delaunay2DNode } from './patterns/delaunay/delaunay2-d.node.js';
import { Delaunay3DNode } from './patterns/delaunay/delaunay3-d.node.js';
import { ConstrainedDelaunayNode } from './patterns/delaunay/constrained-delaunay.node.js';
import { AlphaShapeNode } from './patterns/delaunay/alpha-shape.node.js';
import { VoronoiFractureNode } from './patterns/voronoi/voronoi-fracture.node.js';
import { VoronoiGrowthNode } from './patterns/voronoi/voronoi-growth.node.js';
import { DelaunayMeshNode } from './patterns/delaunay/delaunay-mesh.node.js';
import { VoronoiSkeletonNode } from './patterns/voronoi/voronoi-skeleton.node.js';
import { VoronoiOffsetNode } from './patterns/voronoi/voronoi-offset.node.js';
import { ConvexHullNode } from './patterns/delaunay/convex-hull.node.js';
import { IslamicStarNode } from './patterns/islamic/islamic-star.node.js';
import { GirihTilingNode } from './patterns/islamic/girih-tiling.node.js';
import { ArabesqueNode } from './patterns/islamic/arabesque.node.js';
import { MoorishPatternNode } from './patterns/islamic/moorish-pattern.node.js';
import { IslamicGridNode } from './patterns/islamic/islamic-grid.node.js';
import { CelticKnotNode } from './patterns/celtic/celtic-knot.node.js';
import { CelticBraidNode } from './patterns/celtic/celtic-braid.node.js';
import { PenroseTilingNode } from './patterns/geometric/penrose-tiling.node.js';
import { TruchetTilesNode } from './patterns/geometric/truchet-tiles.node.js';
import { SpiralPatternNode } from './patterns/geometric/spiral-pattern.node.js';
import { MandalaPatternNode } from './patterns/geometric/mandala-pattern.node.js';
import { PolygonalTessellationNode } from './patterns/geometric/polygonal-tessellation.node.js';
import { CirclePackingNode } from './patterns/geometric/circle-packing.node.js';
import { HyperbolicTilingNode } from './patterns/geometric/hyperbolic-tiling.node.js';
import { GeodesicPatternNode } from './patterns/geometric/geodesic-pattern.node.js';
import { MuqarnasNode } from './patterns/islamic/muqarnas.node.js';
import { QuasiCrystalNode } from './patterns/geometric/quasi-crystal.node.js';
import { MinimalSurfaceNode } from './patterns/geometric/minimal-surface.node.js';
import { ReactionDiffusionNode as GeometricReactionDiffusionNode } from './patterns/geometric/reaction-diffusion.node.js';
import { ParquetDeformationNode } from './patterns/geometric/parquet-deformation.node.js';
import { KochSnowflakeNode } from './patterns/fractals/koch-snowflake.node.js';
import { SierpinskiTriangleNode } from './patterns/fractals/sierpinski-triangle.node.js';
import { MengerSpongeNode } from './patterns/fractals/menger-sponge.node.js';
import { JuliaSetNode } from './patterns/fractals/julia-set.node.js';
import { MandelbrotSetNode } from './patterns/fractals/mandelbrot-set.node.js';
import { LSystem2DNode } from './patterns/l-systems/l-system2-d.node.js';
import { LSystem3DNode } from './patterns/l-systems/l-system3-d.node.js';
import { TreeGeneratorNode } from './patterns/l-systems/tree-generator.node.js';
import { DragonCurveNode } from './patterns/fractals/dragon-curve.node.js';
import { HilbertCurveNode } from './patterns/fractals/hilbert-curve.node.js';
import { PeanoCurveNode } from './patterns/fractals/peano-curve.node.js';
import { CantorSetNode } from './patterns/fractals/cantor-set.node.js';
import { PlantGrowthNode } from './patterns/l-systems/plant-growth.node.js';
import { BarnsleyFernNode } from './patterns/fractals/barnsley-fern.node.js';
import { ApollonianGasketNode } from './patterns/fractals/apollonian-gasket.node.js';
import { RectanglePackingNode } from './patterns/packing/rectangle-packing.node.js';
import { SpherePackingNode } from './patterns/packing/sphere-packing.node.js';
import { PolygonPackingNode } from './patterns/packing/polygon-packing.node.js';
import { CubicLatticeNode } from './patterns/lattice/cubic-lattice.node.js';
import { OctetLatticeNode } from './patterns/lattice/octet-lattice.node.js';
import { DiamondLatticeNode } from './patterns/lattice/diamond-lattice.node.js';
import { KelvinLatticeNode } from './patterns/lattice/kelvin-lattice.node.js';
import { TPMSLatticeNode } from './patterns/lattice/t-p-m-s-lattice.node.js';
import { BrickPatternNode } from './patterns/tiling/brick-pattern.node.js';
import { ParquetPatternNode } from './patterns/tiling/parquet-pattern.node.js';
import { WeavePatternNode } from './patterns/tiling/weave-pattern.node.js';
import { HoneycombPatternNode } from './patterns/cellular/honeycomb-pattern.node.js';
import { FoamStructureNode } from './patterns/cellular/foam-structure.node.js';
import { CellularAutomataNode } from './patterns/cellular/cellular-automata.node.js';
import { ConwayLifeNode } from './patterns/cellular/conway-life.node.js';
import { PoissonDiskNode } from './patterns/stochastic/poisson-disk.node.js';
import { BlueNoiseNode } from './patterns/stochastic/blue-noise.node.js';
import { JitteredGridNode } from './patterns/stochastic/jittered-grid.node.js';
import { MinimumSpanningTreeNode } from './patterns/network/minimum-spanning-tree.node.js';
import { RelativeNeighborhoodNode } from './patterns/network/relative-neighborhood.node.js';
import { BinaryTreeNode } from './patterns/algorithmic/binary-tree.node.js';
import { MazeGeneratorNode } from './patterns/algorithmic/maze-generator.node.js';
import { SubdivisionSurfaceNode as AlgorithmicSubdivisionSurfaceNode } from './patterns/algorithmic/subdivision-surface.node.js';
import { FlockingPatternNode } from './patterns/algorithmic/flocking-pattern.node.js';
import { DiffusionLimitedAggregationNode } from './patterns/algorithmic/diffusion-limited-aggregation.node.js';
import { GrammarShapesNode } from './patterns/procedural/grammar-shapes.node.js';
import { WaveFunctionCollapseNode } from './patterns/procedural/wave-function-collapse.node.js';
import { MarkovChainNode } from './patterns/procedural/markov-chain.node.js';
import { GeneticAlgorithmNode } from './patterns/procedural/genetic-algorithm.node.js';
import { NeuralPatternNode } from './patterns/procedural/neural-pattern.node.js';
import { StrangeAttractorNode } from './patterns/algorithmic/strange-attractor.node.js';
import { PhyllotaxisPatternNode } from './patterns/algorithmic/phyllotaxis-pattern.node.js';
import { TuringPatternNode } from './patterns/procedural/turing-pattern.node.js';
import { NoisePatternNode } from './patterns/procedural/noise-pattern.node.js';
import { PackingCirclesNode } from './patterns/algorithmic/packing-circles.node.js';
import { KMeansClusteringNode as AlgorithmicKMeansClusteringNode } from './patterns/algorithmic/k-means-clustering.node.js';
import { ContextFreeArtNode } from './patterns/procedural/context-free-art.node.js';
import { ProceduralTextureNode } from './patterns/procedural/procedural-texture.node.js';
import { GraphLayoutNode } from './patterns/algorithmic/graph-layout.node.js';
import { ShortestPathNode as AlgorithmicShortestPathNode } from './patterns/algorithmic/shortest-path.node.js';
import { SupportGenerationNode } from './fabrication/3d-printing/support-generation.node.js';
import { PrintOrientationNode } from './fabrication/3d-printing/print-orientation.node.js';
import { SliceModelNode } from './fabrication/3d-printing/slice-model.node.js';
import { BridgeDetectionNode } from './fabrication/3d-printing/bridge-detection.node.js';
import { WallThicknessNode } from './fabrication/3d-printing/wall-thickness.node.js';
import { PrintTimeEstimateNode } from './fabrication/3d-printing/print-time-estimate.node.js';
import { RaftGenerationNode } from './fabrication/3d-printing/raft-generation.node.js';
import { BrimGenerationNode } from './fabrication/3d-printing/brim-generation.node.js';
import { SeamOptimizationNode } from './fabrication/3d-printing/seam-optimization.node.js';
import { InfillOptimizationNode } from './fabrication/3d-printing/infill-optimization.node.js';
import { CoolingAnalysisNode } from './fabrication/3d-printing/cooling-analysis.node.js';
import { RetractionOptimizationNode } from './fabrication/3d-printing/retraction-optimization.node.js';
import { VaseModeNode } from './fabrication/3d-printing/vase-mode.node.js';
import { MultiMaterialSetupNode } from './fabrication/3d-printing/multi-material-setup.node.js';
import { TreeSupportsNode } from './fabrication/3d-printing/tree-supports.node.js';
import { IroningPassNode } from './fabrication/3d-printing/ironing-pass.node.js';
import { FuzzySkinnNode } from './fabrication/3d-printing/fuzzy-skinn.node.js';
import { CoastingSetupNode } from './fabrication/3d-printing/coasting-setup.node.js';
import { WipeTowerNode } from './fabrication/3d-printing/wipe-tower.node.js';
import { AdaptiveLayerHeightNode } from './fabrication/3d-printing/adaptive-layer-height.node.js';
import { PerimeterGeneratorNode } from './fabrication/3d-printing/perimeter-generator.node.js';
import { GCodePostProcessorNode } from './fabrication/3d-printing/g-code-post-processor.node.js';
import { NonPlanarSlicingNode } from './fabrication/3d-printing/non-planar-slicing.node.js';
import { ConicalSlicingNode } from './fabrication/3d-printing/conical-slicing.node.js';
import { SolubleSupportInterfaceNode } from './fabrication/3d-printing/soluble-support-interface.node.js';
import { ToolpathGenerationNode } from './fabrication/cnc/toolpath-generation.node.js';
import { PocketingStrategyNode } from './fabrication/cnc/pocketing-strategy.node.js';
import { ContouringToolpathNode } from './fabrication/cnc/contouring-toolpath.node.js';
import { DrillingOperationNode } from './fabrication/cnc/drilling-operation.node.js';
import { ThreadMillingNode } from './fabrication/cnc/thread-milling.node.js';
import { AdaptiveClearingNode } from './fabrication/cnc/adaptive-clearing.node.js';
import { TrochoidalMillingNode } from './fabrication/cnc/trochoidal-milling.node.js';
import { RestMachiningNode } from './fabrication/cnc/rest-machining.node.js';
import { ToolCompensationNode } from './fabrication/cnc/tool-compensation.node.js';
import { HelicalEntryNode } from './fabrication/cnc/helical-entry.node.js';
import { RampEntryNode } from './fabrication/cnc/ramp-entry.node.js';
import { HighSpeedMachiningNode } from './fabrication/cnc/high-speed-machining.node.js';
import { ScallopHeightNode } from './fabrication/cnc/scallop-height.node.js';
import { CollisionDetectionNode as CNCCollisionDetectionNode } from './fabrication/cnc/collision-detection.node.js';
import { FeedsAndSpeedsNode } from './fabrication/cnc/feeds-and-speeds.node.js';
import { FiveAxisPositioningNode } from './fabrication/cnc/five-axis-positioning.node.js';
import { SwarmMillingNode } from './fabrication/cnc/swarm-milling.node.js';
import { ToolLibraryNode } from './fabrication/cnc/tool-library.node.js';
import { WorkCoordinateNode } from './fabrication/cnc/work-coordinate.node.js';
import { PostProcessorNode } from './fabrication/cnc/post-processor.node.js';
import { ChipEvacuationNode } from './fabrication/cnc/chip-evacuation.node.js';
import { CutterEngagementNode } from './fabrication/cnc/cutter-engagement.node.js';
import { ToolWearNode } from './fabrication/cnc/tool-wear.node.js';
import { SetupSheetsNode } from './fabrication/cnc/setup-sheets.node.js';
import { ProbeRoutineNode } from './fabrication/cnc/probe-routine.node.js';
import { LaserPathNode } from './fabrication/laser/laser-path.node.js';
import { TabsAndSlotsNode } from './fabrication/laser/tabs-and-slots.node.js';
import { LivingHingeNode } from './fabrication/laser/living-hinge.node.js';
import { KerfBendingNode } from './fabrication/laser/kerf-bending.node.js';
import { PowerMappingNode } from './fabrication/laser/power-mapping.node.js';
import { EngraveRasterNode } from './fabrication/laser/engrave-raster.node.js';
import { VectorEngraveNode } from './fabrication/laser/vector-engrave.node.js';
import { NestingOptimizationNode } from './fabrication/laser/nesting-optimization.node.js';
import { CutOrderOptimizationNode } from './fabrication/laser/cut-order-optimization.node.js';
import { LeadInOutNode } from './fabrication/laser/lead-in-out.node.js';
import { BridgeGenerationNode } from './fabrication/laser/bridge-generation.node.js';
import { FocusCompensationNode } from './fabrication/laser/focus-compensation.node.js';
import { HatchFillNode } from './fabrication/laser/hatch-fill.node.js';
import { TextEngravingNode } from './fabrication/laser/text-engraving.node.js';
import { MaterialDatabaseNode } from './fabrication/laser/material-database.node.js';
import { LayerSeparationNode } from './fabrication/laser/layer-separation.node.js';
import { MultiplePassesNode } from './fabrication/laser/multiple-passes.node.js';
import { CleanupPathsNode } from './fabrication/laser/cleanup-paths.node.js';
import { PierceOptimizationNode } from './fabrication/laser/pierce-optimization.node.js';
import { MicroJointsNode } from './fabrication/laser/micro-joints.node.js';
import { CutQualityNode } from './fabrication/laser/cut-quality.node.js';
import { RotaryAttachmentNode } from './fabrication/laser/rotary-attachment.node.js';
import { AirAssistNode } from './fabrication/laser/air-assist.node.js';
import { SafetyZonesNode } from './fabrication/laser/safety-zones.node.js';
import { JobTimeEstimateNode } from './fabrication/laser/job-time-estimate.node.js';
import { RobotKinematicsNode } from './fabrication/robotics/robot-kinematics.node.js';
import { PathPlanningNode } from './fabrication/robotics/path-planning.node.js';
import { CollisionAvoidanceNode } from './fabrication/robotics/collision-avoidance.node.js';
import { EndEffectorSetupNode } from './fabrication/robotics/end-effector-setup.node.js';
import { WorkCellSetupNode } from './fabrication/robotics/work-cell-setup.node.js';
import { TrajectoryOptimizationNode } from './fabrication/robotics/trajectory-optimization.node.js';
import { SingularityAvoidanceNode } from './fabrication/robotics/singularity-avoidance.node.js';
import { RobotCalibrationNode } from './fabrication/robotics/robot-calibration.node.js';
import { ForceControlNode } from './fabrication/robotics/force-control.node.js';
import { WeldingPathNode } from './fabrication/robotics/welding-path.node.js';
import { PickAndPlaceNode } from './fabrication/robotics/pick-and-place.node.js';
import { PalletizingPatternNode } from './fabrication/robotics/palletizing-pattern.node.js';
import { RoboticMillingNode } from './fabrication/robotics/robotic-milling.node.js';
import { SprayPaintingNode } from './fabrication/robotics/spray-painting.node.js';
import { AdditiveManufacturingNode } from './fabrication/robotics/additive-manufacturing.node.js';
import { VisionGuidanceNode } from './fabrication/robotics/vision-guidance.node.js';
import { MultiRobotCoordinationNode } from './fabrication/robotics/multi-robot-coordination.node.js';
import { ConveyorTrackingNode } from './fabrication/robotics/conveyor-tracking.node.js';
import { SafetyZoneSetupNode } from './fabrication/robotics/safety-zone-setup.node.js';
import { RobotSimulationNode } from './fabrication/robotics/robot-simulation.node.js';
import { PostProcessorRobotNode } from './fabrication/robotics/post-processor-robot.node.js';
import { ReachAnalysisNode } from './fabrication/robotics/reach-analysis.node.js';
import { JointLimitAvoidanceNode } from './fabrication/robotics/joint-limit-avoidance.node.js';
import { ToolChangerSetupNode } from './fabrication/robotics/tool-changer-setup.node.js';
import { RobotMaintenanceNode } from './fabrication/robotics/robot-maintenance.node.js';
import { StraightWallNode } from './architecture/walls/straight-wall.node.js';
import { CurvedWallNode } from './architecture/walls/curved-wall.node.js';
import { CompoundWallNode } from './architecture/walls/compound-wall.node.js';
import { CurtainWallNode } from './architecture/walls/curtain-wall.node.js';
import { WallOpeningNode } from './architecture/walls/wall-opening.node.js';
import { WallJoinNode } from './architecture/walls/wall-join.node.js';
import { RetainingWallNode } from './architecture/walls/retaining-wall.node.js';
import { StudWallNode } from './architecture/walls/stud-wall.node.js';
import { InsulatedWallNode } from './architecture/walls/insulated-wall.node.js';
import { TiltUpPanelNode } from './architecture/walls/tilt-up-panel.node.js';
import { ParapetWallNode } from './architecture/walls/parapet-wall.node.js';
import { FireWallNode } from './architecture/walls/fire-wall.node.js';
import { MovablePartitionNode } from './architecture/walls/movable-partition.node.js';
import { SoundproofWallNode } from './architecture/walls/soundproof-wall.node.js';
import { GreenWallNode } from './architecture/walls/green-wall.node.js';
import { DoubleSkinnedFacadeNode } from './architecture/walls/double-skinned-facade.node.js';
import { RainScreenNode } from './architecture/walls/rain-screen.node.js';
import { ShearWallNode } from './architecture/walls/shear-wall.node.js';
import { FoundationWallNode } from './architecture/walls/foundation-wall.node.js';
import { HistoricWallRestorationNode } from './architecture/walls/historic-wall-restoration.node.js';
import { SlabOnGradeNode } from './architecture/floors/slab-on-grade.node.js';
import { CompositeFloorNode } from './architecture/floors/composite-floor.node.js';
import { RaisedFloorNode } from './architecture/floors/raised-floor.node.js';
import { WoodJoistFloorNode } from './architecture/floors/wood-joist-floor.node.js';
import { PostTensionedSlabNode } from './architecture/floors/post-tensioned-slab.node.js';
import { SuspendedCeilingNode } from './architecture/ceilings/suspended-ceiling.node.js';
import { CofferedCeilingNode } from './architecture/ceilings/coffered-ceiling.node.js';
import { VaultedCeilingNode } from './architecture/ceilings/vaulted-ceiling.node.js';
import { MezzanineFloorNode } from './architecture/floors/mezzanine-floor.node.js';
import { EpoxyFloorNode } from './architecture/floors/epoxy-floor.node.js';
import { RadiantFloorNode } from './architecture/floors/radiant-floor.node.js';
import { AcousticCeilingNode } from './architecture/ceilings/acoustic-ceiling.node.js';
import { FloorDrainageNode } from './architecture/floors/floor-drainage.node.js';
import { StretchCeilingNode } from './architecture/ceilings/stretch-ceiling.node.js';
import { GreenRoofNode } from './architecture/floors/green-roof.node.js';
import { FloorExpansionJointNode } from './architecture/floors/floor-expansion-joint.node.js';
import { SkyLightNode } from './architecture/ceilings/sky-light.node.js';
import { FloorFinishNode } from './architecture/floors/floor-finish.node.js';
import { CeilingBeamNode } from './architecture/ceilings/ceiling-beam.node.js';
import { PedestalPaversNode } from './architecture/floors/pedestal-pavers.node.js';
import { StraightStairNode } from './architecture/stairs/straight-stair.node.js';
import { LShapedStairNode } from './architecture/stairs/l-shaped-stair.node.js';
import { UShapedStairNode } from './architecture/stairs/u-shaped-stair.node.js';
import { SpiralStairNode } from './architecture/stairs/spiral-stair.node.js';
import { HelicalStairNode } from './architecture/stairs/helical-stair.node.js';
import { WinderStairNode } from './architecture/stairs/winder-stair.node.js';
import { StraightRampNode } from './architecture/ramps/straight-ramp.node.js';
import { SwitchbackRampNode } from './architecture/ramps/switchback-ramp.node.js';
import { HelicalRampNode } from './architecture/ramps/helical-ramp.node.js';
import { StairHandrailNode } from './architecture/stairs/stair-handrail.node.js';
import { StairBalustradeNode } from './architecture/stairs/stair-balustrade.node.js';
import { StairNosingNode } from './architecture/stairs/stair-nosing.node.js';
import { StairStringerNode } from './architecture/stairs/stair-stringer.node.js';
import { EscapeStairNode } from './architecture/stairs/escape-stair.node.js';
import { MonumentalStairNode } from './architecture/stairs/monumental-stair.node.js';
import { FloatingStairNode } from './architecture/stairs/floating-stair.node.js';
import { LoadingDockNode } from './architecture/ramps/loading-dock.node.js';
import { CurbRampNode } from './architecture/ramps/curb-ramp.node.js';
import { AlternatingTreadStairNode } from './architecture/stairs/alternating-tread-stair.node.js';
import { VehicleRampNode } from './architecture/ramps/vehicle-ramp.node.js';
import { SingleDoorNode } from './architecture/doors/single-door.node.js';
import { DoubleDoorNode } from './architecture/doors/double-door.node.js';
import { SlidingDoorNode } from './architecture/doors/sliding-door.node.js';
import { RevolvingDoorNode } from './architecture/doors/revolving-door.node.js';
import { FoldingDoorNode } from './architecture/doors/folding-door.node.js';
import { RollupDoorNode } from './architecture/doors/rollup-door.node.js';
import { CasementWindowNode } from './architecture/windows/casement-window.node.js';
import { SlidingWindowNode } from './architecture/windows/sliding-window.node.js';
import { DoubleHungWindowNode } from './architecture/windows/double-hung-window.node.js';
import { AwningWindowNode } from './architecture/windows/awning-window.node.js';
import { BayWindowNode } from './architecture/windows/bay-window.node.js';
import { BowWindowNode } from './architecture/windows/bow-window.node.js';
import { ClerestroyWindowNode } from './architecture/windows/clerestroy-window.node.js';
import { FireDoorNode } from './architecture/doors/fire-door.node.js';
import { SecurityDoorNode } from './architecture/doors/security-door.node.js';
import { StainedGlassWindowNode } from './architecture/windows/stained-glass-window.node.js';
import { OverheadDoorNode } from './architecture/doors/overhead-door.node.js';
import { JalousieWindowNode } from './architecture/windows/jalousie-window.node.js';
import { DutchDoorNode } from './architecture/doors/dutch-door.node.js';
import { GothicWindowNode } from './architecture/windows/gothic-window.node.js';
import { SpurGearNode } from './mechanicalengineering/gears/spur-gear.node.js';
import { HelicalGearNode } from './mechanicalengineering/gears/helical-gear.node.js';
import { BevelGearNode } from './mechanicalengineering/gears/bevel-gear.node.js';
import { WormGearNode } from './mechanicalengineering/gears/worm-gear.node.js';
import { WormShaftNode } from './mechanicalengineering/gears/worm-shaft.node.js';
import { RackGearNode } from './mechanicalengineering/gears/rack-gear.node.js';
import { InternalGearNode } from './mechanicalengineering/gears/internal-gear.node.js';
import { PlanetaryGearSetNode } from './mechanicalengineering/gears/planetary-gear-set.node.js';
import { TimingPulleyNode } from './mechanicalengineering/gears/timing-pulley.node.js';
import { ChainSprocketNode } from './mechanicalengineering/gears/chain-sprocket.node.js';
import { CVTDiscNode } from './mechanicalengineering/gears/c-v-t-disc.node.js';
import { DifferentialGearNode } from './mechanicalengineering/gears/differential-gear.node.js';
import { BallBearingNode } from './mechanicalengineering/bearings/ball-bearing.node.js';
import { RollerBearingNode } from './mechanicalengineering/bearings/roller-bearing.node.js';
import { ThrustBearingNode } from './mechanicalengineering/bearings/thrust-bearing.node.js';
import { NeedleBearingNode } from './mechanicalengineering/bearings/needle-bearing.node.js';
import { LinearBearingNode } from './mechanicalengineering/bearings/linear-bearing.node.js';
import { PillowBlockNode } from './mechanicalengineering/bearings/pillow-block.node.js';
import { FlangeBearingNode } from './mechanicalengineering/bearings/flange-bearing.node.js';
import { BronzeBushingNode } from './mechanicalengineering/bearings/bronze-bushing.node.js';
import { SphericalBearingNode } from './mechanicalengineering/bearings/spherical-bearing.node.js';
import { AirBearingNode } from './mechanicalengineering/bearings/air-bearing.node.js';
import { HexBoltNode } from './mechanicalengineering/fasteners/hex-bolt.node.js';
import { SocketHeadCapScrewNode } from './mechanicalengineering/fasteners/socket-head-cap-screw.node.js';
import { HexNutNode } from './mechanicalengineering/fasteners/hex-nut.node.js';
import { WasherNode } from './mechanicalengineering/fasteners/washer.node.js';
import { ThreadInsertNode } from './mechanicalengineering/fasteners/thread-insert.node.js';
import { RivetNode } from './mechanicalengineering/fasteners/rivet.node.js';
import { ClampingCollarNode } from './mechanicalengineering/fasteners/clamping-collar.node.js';
import { DowelNode } from './mechanicalengineering/fasteners/dowel.node.js';
import { RetainingRingNode } from './mechanicalengineering/fasteners/retaining-ring.node.js';
import { KeywayJointNode } from './mechanicalengineering/fasteners/keyway-joint.node.js';
import { CompressionSpringNode } from './mechanicalengineering/springs/compression-spring.node.js';
import { ExtensionSpringNode } from './mechanicalengineering/springs/extension-spring.node.js';
import { TorsionSpringNode } from './mechanicalengineering/springs/torsion-spring.node.js';
import { LeafSpringNode } from './mechanicalengineering/springs/leaf-spring.node.js';
import { GasSpringNode } from './mechanicalengineering/springs/gas-spring.node.js';
import { CamProfileNode } from './mechanicalengineering/mechanisms/cam-profile.node.js';
import { LinkageMechanismNode } from './mechanicalengineering/mechanisms/linkage-mechanism.node.js';
import { RatchetMechanismNode } from './mechanicalengineering/mechanisms/ratchet-mechanism.node.js';
import { ClutchMechanismNode } from './mechanicalengineering/mechanisms/clutch-mechanism.node.js';
import { UniversalJointNode } from './mechanicalengineering/mechanisms/universal-joint.node.js';
import { SteppedShaftNode } from './mechanicalengineering/shafts/stepped-shaft.node.js';
import { SplinedShaftNode } from './mechanicalengineering/shafts/splined-shaft.node.js';
import { FlexibleShaftNode } from './mechanicalengineering/shafts/flexible-shaft.node.js';
import { HollowShaftNode } from './mechanicalengineering/shafts/hollow-shaft.node.js';
import { RigidCouplingNode } from './mechanicalengineering/couplings/rigid-coupling.node.js';
import { FlexibleCouplingNode } from './mechanicalengineering/couplings/flexible-coupling.node.js';
import { OldhamCouplingNode } from './mechanicalengineering/couplings/oldham-coupling.node.js';
import { FluidCouplingNode } from './mechanicalengineering/couplings/fluid-coupling.node.js';
import { PulleySystemNode } from './mechanicalengineering/powertransmission/pulley-system.node.js';
import { ChainDriveNode } from './mechanicalengineering/powertransmission/chain-drive.node.js';
import { CurvatureCombNode } from './analysis/curves/curvature-comb.node.js';
import { CurveLengthNode } from './analysis/curves/curve-length.node.js';
import { CurveSmoothnessAnalysisNode } from './analysis/curves/curve-smoothness-analysis.node.js';
import { CurveInflectionPointsNode } from './analysis/curves/curve-inflection-points.node.js';
import { CurveTorsionNode } from './analysis/curves/curve-torsion.node.js';
import { CurveDerivativesNode } from './analysis/curves/curve-derivatives.node.js';
import { CurveParameterNode } from './analysis/curves/curve-parameter.node.js';
import { CurveEndpointsNode } from './analysis/curves/curve-endpoints.node.js';
import { CurveClosestPointNode } from './analysis/curves/curve-closest-point.node.js';
import { CurveExtremePointsNode } from './analysis/curves/curve-extreme-points.node.js';
import { CurveAreaMomentsNode } from './analysis/curves/curve-area-moments.node.js';
import { CurveConvexHullNode } from './analysis/curves/curve-convex-hull.node.js';
import { CurveBoundingBoxNode } from './analysis/curves/curve-bounding-box.node.js';
import { CurveSpiralNode } from './analysis/curves/curve-spiral.node.js';
import { SurfaceCurvatureNode } from './analysis/surfaces/surface-curvature.node.js';
import { SurfaceNormalsNode } from './analysis/surfaces/surface-normals.node.js';
import { SurfaceAreaNode } from './analysis/surfaces/surface-area.node.js';
import { SurfaceIsoCurvesNode } from './analysis/surfaces/surface-iso-curves.node.js';
import { SurfaceParametrizationNode } from './analysis/surfaces/surface-parametrization.node.js';
import { SurfaceDerivativesNode } from './analysis/surfaces/surface-derivatives.node.js';
import { SurfaceClosestPointNode } from './analysis/surfaces/surface-closest-point.node.js';
import { SurfaceBoundaryNode } from './analysis/surfaces/surface-boundary.node.js';
import { SurfaceContinuityNode } from './analysis/surfaces/surface-continuity.node.js';
import { SurfaceDeviationNode as AnalysisSurfaceDeviationNode } from './analysis/surfaces/surface-deviation.node.js';
import { SurfaceFlatnessNode } from './analysis/surfaces/surface-flatness.node.js';
import { SurfaceRoughnessNode } from './analysis/surfaces/surface-roughness.node.js';
import { CurveCurveIntersectionNode } from './analysis/intersection/curve-curve-intersection.node.js';
import { CurveSurfaceIntersectionNode } from './analysis/intersection/curve-surface-intersection.node.js';
import { SurfaceSurfaceIntersectionNode } from './analysis/intersection/surface-surface-intersection.node.js';
import { PlaneIntersectionNode } from './analysis/intersection/plane-intersection.node.js';
import { RayIntersectionNode } from './analysis/intersection/ray-intersection.node.js';
import { MinimumDistanceNode } from './analysis/proximity/minimum-distance.node.js';
import { ProximityAnalysisNode } from './analysis/proximity/proximity-analysis.node.js';
import { ClearanceCheckNode } from './analysis/proximity/clearance-check.node.js';
import { CollisionDetectionNode as ProximityCollisionDetectionNode } from './analysis/proximity/collision-detection.node.js';
import { VisibilityAnalysisNode } from './analysis/proximity/visibility-analysis.node.js';
import { ShadowAnalysisNode } from './analysis/proximity/shadow-analysis.node.js';
import { VolumeCalculationNode } from './analysis/measurement/volume-calculation.node.js';
import { AngleMeasurementNode } from './analysis/measurement/angle-measurement.node.js';
import { DistanceMeasurementNode } from './analysis/measurement/distance-measurement.node.js';
import { GeometryValidationNode } from './analysis/quality/geometry-validation.node.js';
import { MeshQualityNode } from './analysis/quality/mesh-quality.node.js';
import { ToleranceAnalysisNode } from './analysis/quality/tolerance-analysis.node.js';
import { STEPImportNode } from './interoperability/import/s-t-e-p-import.node.js';
import { STEPExportNode } from './interoperability/export/s-t-e-p-export.node.js';
import { IGESImportNode } from './interoperability/import/i-g-e-s-import.node.js';
import { IGESExportNode } from './interoperability/export/i-g-e-s-export.node.js';
import { STLImportNode } from './interoperability/import/s-t-l-import.node.js';
import { STLExportNode } from './interoperability/export/s-t-l-export.node.js';
import { OBJImportNode } from './interoperability/import/o-b-j-import.node.js';
import { OBJExportNode } from './interoperability/export/o-b-j-export.node.js';
import { PLYImportNode } from './interoperability/import/p-l-y-import.node.js';
import { PLYExportNode } from './interoperability/export/p-l-y-export.node.js';
import { ThreeMFImportNode } from './interoperability/import/three-m-f-import.node.js';
import { ThreeMFExportNode } from './interoperability/export/three-m-f-export.node.js';
import { DXFImportNode } from './interoperability/import/d-x-f-import.node.js';
import { DXFExportNode } from './interoperability/export/d-x-f-export.node.js';
import { SVGImportNode } from './interoperability/import/s-v-g-import.node.js';
import { SVGExportNode } from './interoperability/export/s-v-g-export.node.js';
import { SQLQueryNode } from './interoperability/database/s-q-l-query.node.js';
import { SQLInsertNode } from './interoperability/database/s-q-l-insert.node.js';
import { HTTPRequestNode } from './interoperability/api/h-t-t-p-request.node.js';
import { JSONParserNode } from './interoperability/api/j-s-o-n-parser.node.js';
import { JSONGeneratorNode } from './interoperability/api/j-s-o-n-generator.node.js';
import { S3UploadNode } from './interoperability/cloud/s3-upload.node.js';
import { S3DownloadNode } from './interoperability/cloud/s3-download.node.js';
import { EmailSenderNode } from './interoperability/messaging/email-sender.node.js';
import { SlackNotificationNode } from './interoperability/messaging/slack-notification.node.js';
import { CSVReaderNode } from './interoperability/data/c-s-v-reader.node.js';
import { CSVWriterNode } from './interoperability/data/c-s-v-writer.node.js';
import { ExcelReaderNode } from './interoperability/data/excel-reader.node.js';
import { ExcelWriterNode } from './interoperability/data/excel-writer.node.js';
import { GrasshopperExportNode } from './interoperability/integration/grasshopper-export.node.js';
import { WebSocketClientNode } from './interoperability/streaming/web-socket-client.node.js';
import { MQTTPublisherNode } from './interoperability/streaming/m-q-t-t-publisher.node.js';
import { MQTTSubscriberNode } from './interoperability/streaming/m-q-t-t-subscriber.node.js';
import { SerialPortNode } from './interoperability/streaming/serial-port.node.js';
import { TCPClientNode } from './interoperability/streaming/t-c-p-client.node.js';
import { GeneticOptimizerNode } from './algorithmic/optimization/genetic-optimizer.node.js';
import { ParticleSwarmOptimizerNode } from './algorithmic/optimization/particle-swarm-optimizer.node.js';
import { SimulatedAnnealingNode } from './algorithmic/optimization/simulated-annealing.node.js';
import { GradientDescentNode } from './algorithmic/optimization/gradient-descent.node.js';
import { TopologyOptimizerNode } from './algorithmic/optimization/topology-optimizer.node.js';
import { LinearRegressionNode } from './algorithmic/machinelearning/linear-regression.node.js';
import { KMeansClusteringNode as MachineLearningKMeansClusteringNode } from './algorithmic/machinelearning/k-means-clustering.node.js';
import { DecisionTreeNode } from './algorithmic/machinelearning/decision-tree.node.js';
import { NeuralNetworkNode } from './algorithmic/machinelearning/neural-network.node.js';
import { SupportVectorMachineNode } from './algorithmic/machinelearning/support-vector-machine.node.js';
import { ConvexHull3DNode } from './algorithmic/geometry/convex-hull3-d.node.js';
import { AlphaShapeNode as GeometryAlphaShapeNode } from './algorithmic/geometry/alpha-shape.node.js';
import { MinimumSpanningTreeNode as GeometryMinimumSpanningTreeNode } from './algorithmic/geometry/minimum-spanning-tree.node.js';
import { ShortestPathNode as GeometryShortestPathNode } from './algorithmic/geometry/shortest-path.node.js';
import { VisibilityGraphNode } from './algorithmic/geometry/visibility-graph.node.js';
import { MedialAxisNode } from './algorithmic/geometry/medial-axis.node.js';
import { DistanceFieldNode as GeometryDistanceFieldNode } from './algorithmic/geometry/distance-field.node.js';
import { MarchingCubesNode } from './algorithmic/geometry/marching-cubes.node.js';
import { SpacePartitioningNode } from './algorithmic/geometry/space-partitioning.node.js';
import { VoxelGridNode } from './algorithmic/geometry/voxel-grid.node.js';
import { PointCloudProcessingNode } from './algorithmic/geometry/point-cloud-processing.node.js';
import { SurfaceReconstructionNode } from './algorithmic/geometry/surface-reconstruction.node.js';
import { GeometrySimplificationNode } from './algorithmic/geometry/geometry-simplification.node.js';
import { GeometryMatchingNode } from './algorithmic/geometry/geometry-matching.node.js';
import { ShapeDescriptorNode } from './algorithmic/geometry/shape-descriptor.node.js';

// Re-export all nodes
export {
  SimpleHoleNode,
  CounterboreHoleNode,
  CountersinkHoleNode,
  ThreadedHoleNode,
  RectangularPocketNode,
  CircularPocketNode,
  LinearRibNode,
  MountingBossNode,
  LinearPatternNode,
  CircularPatternNode,
  RectangularPatternNode,
  MoveNode,
  RotateNode,
  ScaleNode,
  MirrorNode,
  LinearArrayNode,
  PolarArrayNode,
  PathArrayNode,
  GridArrayNode,
  AlignNode,
  OrientNode,
  ProjectToPlaneNode,
  WrapNode,
  DeformNode,
  BoundingBoxAlignNode,
  MatrixTransformNode,
  PrismNode,
  WedgeNode,
  PyramidNode,
  BezierSurfaceNode,
  BSplineSurfaceNode,
  RuledSurfaceNode,
  HelixNode,
  SpringNode,
  ThreadNode,
  BoxNode,
  SphereNode,
  CylinderNode,
  ConeNode,
  TorusNode,
  EllipsoidNode,
  CapsuleNode,
  RoundedBoxNode,
  PipeNode,
  PolyhedronNode,
  EllipseNode,
  ParabolaNode,
  HyperbolaNode,
  SpiralNode,
  PolygonNode,
  StarNode,
  GearNode,
  LineNode,
  ArcNode,
  CircleNode,
  RectangleNode,
  PolylineNode,
  SplineNode,
  BezierCurveNode,
  BSplineCurveNode,
  PointNode,
  SlotNode,
  TextNode,
  OffsetNode,
  Fillet2DNode,
  Chamfer2DNode,
  TrimNode,
  UnionNode,
  DifferenceNode,
  IntersectionNode,
  XORNode,
  SplitNode,
  FragmentNode,
  CommonEdgesNode,
  ImprintNode,
  GlueNode,
  CompoundNode,
  CoincidentNode,
  ParallelNode,
  PerpendicularNode,
  TangentNode,
  ConcentricNode,
  DistanceNode,
  AngleNode,
  HorizontalNode,
  VerticalNode,
  FixedNode,
  FaceToFaceNode,
  EdgeToEdgeNode,
  PointToPointNode,
  AxisToAxisNode,
  PlaneToPlaneNode,
  FastenedNode,
  CamNode,
  PathNode,
  RevoluteNode,
  PrismaticNode,
  CylindricalNode,
  SphericalNode,
  PlanarNode,
  UniversalNode,
  ScrewNode,
  BeltNode,
  RackPinionNode,
  ComponentPatternNode,
  FlexibleSubAssemblyNode,
  ConfigurationNode,
  ExplodedViewNode,
  BillOfMaterialsNode,
  InterferenceCheckNode,
  MotionStudyNode,
  EnvelopeNode,
  SmartFastenersNode,
  ContactSetNode,
  EdgeFlangeNode,
  ContourFlangeNode,
  MiterFlangeNode,
  SketchedBendNode,
  HemNode,
  JogNode,
  CornerReliefNode,
  BendReliefNode,
  ClosedCornerNode,
  TabNode,
  LouverNode,
  LanceNode,
  BeadNode,
  UnfoldNode,
  FoldNode,
  ExportDXFNode,
  SheetMetalStyleNode,
  BendTableNode,
  CostEstimateNode,
  SweepNode,
  HelicalSweepNode,
  LoftNode,
  BlendSurfaceNode,
  BoundaryNode,
  ShellNode,
  VariableShellNode,
  ThickenNode,
  OffsetSurfaceNode,
  DraftNode,
  PartingLineDraftNode,
  StepDraftNode,
  TrimSurfaceNode,
  ExtendSurfaceNode,
  UntrimSurfaceNode,
  KnitSurfacesNode,
  PatchSurfaceNode,
  DomeNode,
  FlexNode,
  IndentNode,
  HealShapeNode,
  RemoveFeaturesNode,
  DeleteFaceNode,
  SimplifyShapeNode,
  CheckGeometryNode,
  NurbsSurfaceNode,
  NetworkSurfaceNode,
  SurfaceFromPointsNode,
  CoonsPatchNode,
  GordonSurfaceNode,
  NurbsCurveNode,
  InterpolateCurveNode,
  ApproximateCurveNode,
  BlendCurveNode,
  CompositeCurveNode,
  CurvatureAnalysisNode,
  ZebraAnalysisNode,
  DraftAnalysisNode,
  ContinuityCheckNode,
  SurfaceDeviationNode,
  ReflectionLinesNode,
  IsocurveExtractNode,
  SectionCurvesNode,
  ProjectCurveNode,
  IntersectCurvesNode,
  CurveOnSurfaceNode,
  GeodesicCurveNode,
  IsoparametricCurveNode,
  TessellateNode,
  AdaptiveTessellationNode,
  RemeshUniformNode,
  QuadMeshNode,
  VoxelMeshNode,
  RepairMeshNode,
  SimplifyMeshNode,
  FillHolesNode,
  SmoothMeshNode,
  DecimateMeshNode,
  SubdivideMeshNode,
  MeshBooleanNode,
  MeshOffsetNode,
  ImportSTLNode,
  ExportSTLNode,
  ImportOBJNode,
  ExportOBJNode,
  ImportPLYNode,
  Export3MFNode,
  MeshToShapeNode,
  ImportSTEPNode,
  ExportSTEPNode,
  ImportIGESNode,
  ExportIGESNode,
  ImportBREPNode,
  ExportBREPNode,
  ImportParasolidNode,
  ImportACISNode,
  ImportDXFNode,
  ExportSVGNode,
  ImportGLTFNode,
  ExportGLTFNode,
  ImportJSONNode,
  ExportJSONNode,
  Text3DNode,
  EngraveNode,
  EmbossNode,
  SerialNumberNode,
  BarcodeNode,
  LatticeStructureNode,
  TPMSNode,
  VoronoiLatticeNode,
  GradedLatticeNode,
  ConformLatticeNode,
  HoneycombStructureNode,
  TopologyOptimizeNode,
  ShapeOptimizeNode,
  GenerativeDesignNode,
  LightweightStructureNode,
  StressReliefNode,
  PackingOptimizeNode,
  MetaBallsNode,
  SubdivisionSurfaceNode,
  FractalGeometryNode,
  ReactionDiffusionNode,
  BiomimeticStructureNode,
  MeshForFEANode,
  ApplyLoadsNode,
  ApplyConstraintsNode,
  MaterialAssignNode,
  ExportFEANode,
  FluidDomainNode,
  BoundaryLayersNode,
  InletOutletNode,
  FluidPropertiesNode,
  ExportCFDNode,
  JointDefinitionNode,
  MotionDriverNode,
  CollisionDetectionNode,
  ForwardKinematicsNode,
  InverseKinematicsNode,
  AddNode,
  SubtractNode,
  MultiplyNode,
  DivideNode,
  PowerNode,
  ModuloNode,
  AbsoluteNode,
  NegateNode,
  SquareRootNode,
  FactorialNode,
  SineNode,
  CosineNode,
  ArcSineNode,
  ArcCosineNode,
  ArcTangentNode,
  ArcTangent2Node,
  HyperbolicSineNode,
  HyperbolicCosineNode,
  HyperbolicTangentNode,
  NaturalLogNode,
  Log10Node,
  LogBaseNode,
  ExponentialNode,
  Exp10Node,
  RoundNode,
  FloorNode,
  CeilingNode,
  TruncateNode,
  RoundToDecimalNode,
  MinNode,
  MaxNode,
  ClampNode,
  SignNode,
  IsEqualNode,
  AverageNode,
  MedianNode,
  ModeNode,
  StandardDeviationNode,
  VarianceNode,
  SumNode,
  ProductNode,
  RangeNode,
  PercentileNode,
  CorrelationNode,
  RandomNode,
  RandomRangeNode,
  RandomIntegerNode,
  RandomNormalNode,
  RandomPoissonNode,
  RandomExponentialNode,
  RandomChoiceNode,
  ShuffleNode,
  PerlinNoiseNode,
  SimplexNoiseNode,
  LerpNode,
  InverseLerpNode,
  RemapNode,
  SmoothStepNode,
  SmootherStepNode,
  CubicInterpNode,
  HermiteInterpNode,
  BezierInterpNode,
  EaseInNode,
  EaseOutNode,
  EaseInOutNode,
  SpringInterpNode,
  ComplexNumberNode,
  ComplexAddNode,
  ComplexMultiplyNode,
  ComplexConjugateNode,
  ComplexMagnitudeNode,
  ComplexPhaseNode,
  MatrixMultiplyNode,
  MatrixInverseNode,
  MatrixDeterminantNode,
  MatrixTransposeNode,
  ListLengthNode,
  ListItemNode,
  ListSliceNode,
  ListReverseNode,
  ListSortNode,
  ListShuffleNode,
  ListShiftNode,
  ListInsertNode,
  ListRemoveNode,
  ListReplaceNode,
  ListAppendNode,
  ListPrependNode,
  ListJoinNode,
  ListSplitNode,
  ListPartitionNode,
  ListFlattenNode,
  ListUniqueNode,
  ListContainsNode,
  ListFindNode,
  ListFilterNode,
  SetUnionNode,
  SetIntersectionNode,
  SetDifferenceNode,
  SetSymmetricDifferenceNode,
  SetSubsetNode,
  SetCartesianProductNode,
  SetPowerSetNode,
  SetCombinationsNode,
  SetPermutationsNode,
  SetPartitionsNode,
  TreeBranchNode,
  TreePathsNode,
  TreeGraftNode,
  TreeFlattenNode,
  TreeSimplifyNode,
  TreePruneNode,
  TreeMergeNode,
  TreeExplodeNode,
  TreeShiftNode,
  TreeStatisticsNode,
  StringConcatNode,
  StringSplitNode,
  StringReplaceNode,
  StringFormatNode,
  StringCaseNode,
  StringTrimNode,
  StringLengthNode,
  StringSubstringNode,
  StringContainsNode,
  StringMatchNode,
  ToStringNode,
  ToNumberNode,
  ToBooleanNode,
  ToJSONNode,
  FromJSONNode,
  ToCSVNode,
  FromCSVNode,
  ToBase64Node,
  FromBase64Node,
  TypeOfNode,
  LinearFieldNode,
  RadialFieldNode,
  SphericalFieldNode,
  CylindricalFieldNode,
  NoiseFieldNode,
  SineFieldNode,
  VectorFieldNode,
  ImageFieldNode,
  DistanceFieldNode,
  ChargeFieldNode,
  PointAttractorNode,
  CurveAttractorNode,
  SurfaceAttractorNode,
  MeshAttractorNode,
  SpinAttractorNode,
  DirectionalAttractorNode,
  TwistAttractorNode,
  VortexAttractorNode,
  GravityAttractorNode,
  FlowAttractorNode,
  FieldAddNode,
  FieldSubtractNode,
  FieldMultiplyNode,
  FieldDivideNode,
  FieldMinNode,
  FieldMaxNode,
  FieldBlendNode,
  FieldRemapNode,
  FieldClampNode,
  FieldInvertNode,
  FieldGradientNode,
  FieldDivergenceNode,
  FieldCurlNode,
  FieldLaplacianNode,
  FieldSmoothNode,
  SampleFieldNode,
  FieldLineNode,
  IsoContourNode,
  IsoSurfaceNode,
  FieldGridNode,
  FieldDeformNode,
  FieldDisplaceNode,
  FieldScaleNode,
  FieldRotateNode,
  FieldColorNode,
  FieldColorMapNode,
  FieldVectorArrowsNode,
  FieldStreamLinesNode,
  FieldHeatMapNode,
  FieldVolumeNode,
  FieldMinMaxNode,
  FieldAverageNode,
  FieldCriticalPointsNode,
  FieldDivergenceAnalysisNode,
  FieldCurlAnalysisNode,
  FieldFluxNode,
  FieldCirculationNode,
  FieldPotentialNode,
  FieldHistogramNode,
  FieldCorrelationNode,
  FieldMorphingNode,
  FieldWarpNode,
  FieldConvolutionNode,
  FieldFourierNode,
  FieldOptimizeNode,
  Voronoi2DNode,
  Voronoi3DNode,
  WeightedVoronoiNode,
  CentroidalVoronoiNode,
  VoronoiOnSurfaceNode,
  Delaunay2DNode,
  Delaunay3DNode,
  ConstrainedDelaunayNode,
  AlphaShapeNode,
  VoronoiFractureNode,
  VoronoiGrowthNode,
  DelaunayMeshNode,
  VoronoiSkeletonNode,
  VoronoiOffsetNode,
  ConvexHullNode,
  IslamicStarNode,
  GirihTilingNode,
  ArabesqueNode,
  MoorishPatternNode,
  IslamicGridNode,
  CelticKnotNode,
  CelticBraidNode,
  PenroseTilingNode,
  TruchetTilesNode,
  SpiralPatternNode,
  MandalaPatternNode,
  PolygonalTessellationNode,
  CirclePackingNode,
  HyperbolicTilingNode,
  GeodesicPatternNode,
  MuqarnasNode,
  QuasiCrystalNode,
  MinimalSurfaceNode,
  ParquetDeformationNode,
  KochSnowflakeNode,
  SierpinskiTriangleNode,
  MengerSpongeNode,
  JuliaSetNode,
  MandelbrotSetNode,
  LSystem2DNode,
  LSystem3DNode,
  TreeGeneratorNode,
  DragonCurveNode,
  HilbertCurveNode,
  PeanoCurveNode,
  CantorSetNode,
  PlantGrowthNode,
  BarnsleyFernNode,
  ApollonianGasketNode,
  RectanglePackingNode,
  SpherePackingNode,
  PolygonPackingNode,
  CubicLatticeNode,
  OctetLatticeNode,
  DiamondLatticeNode,
  KelvinLatticeNode,
  TPMSLatticeNode,
  BrickPatternNode,
  ParquetPatternNode,
  WeavePatternNode,
  HoneycombPatternNode,
  FoamStructureNode,
  CellularAutomataNode,
  ConwayLifeNode,
  PoissonDiskNode,
  BlueNoiseNode,
  JitteredGridNode,
  MinimumSpanningTreeNode,
  RelativeNeighborhoodNode,
  BinaryTreeNode,
  MazeGeneratorNode,
  FlockingPatternNode,
  DiffusionLimitedAggregationNode,
  GrammarShapesNode,
  WaveFunctionCollapseNode,
  MarkovChainNode,
  GeneticAlgorithmNode,
  NeuralPatternNode,
  StrangeAttractorNode,
  PhyllotaxisPatternNode,
  TuringPatternNode,
  NoisePatternNode,
  PackingCirclesNode,

  SupportGenerationNode,
  PrintOrientationNode,
  SliceModelNode,
  BridgeDetectionNode,
  WallThicknessNode,
  PrintTimeEstimateNode,
  RaftGenerationNode,
  BrimGenerationNode,
  SeamOptimizationNode,
  InfillOptimizationNode,
  CoolingAnalysisNode,
  RetractionOptimizationNode,
  VaseModeNode,
  MultiMaterialSetupNode,
  TreeSupportsNode,
  IroningPassNode,
  FuzzySkinnNode,
  CoastingSetupNode,
  WipeTowerNode,
  AdaptiveLayerHeightNode,
  PerimeterGeneratorNode,
  GCodePostProcessorNode,
  NonPlanarSlicingNode,
  ConicalSlicingNode,
  SolubleSupportInterfaceNode,
  ToolpathGenerationNode,
  PocketingStrategyNode,
  ContouringToolpathNode,
  DrillingOperationNode,
  ThreadMillingNode,
  AdaptiveClearingNode,
  TrochoidalMillingNode,
  RestMachiningNode,
  ToolCompensationNode,
  HelicalEntryNode,
  RampEntryNode,
  HighSpeedMachiningNode,
  ScallopHeightNode,
  FeedsAndSpeedsNode,
  FiveAxisPositioningNode,
  SwarmMillingNode,
  ToolLibraryNode,
  WorkCoordinateNode,
  PostProcessorNode,
  ChipEvacuationNode,
  CutterEngagementNode,
  ToolWearNode,
  SetupSheetsNode,
  ProbeRoutineNode,
  LaserPathNode,
  TabsAndSlotsNode,
  LivingHingeNode,
  KerfBendingNode,
  PowerMappingNode,
  EngraveRasterNode,
  VectorEngraveNode,
  NestingOptimizationNode,
  CutOrderOptimizationNode,
  LeadInOutNode,
  BridgeGenerationNode,
  FocusCompensationNode,
  HatchFillNode,
  TextEngravingNode,
  MaterialDatabaseNode,
  LayerSeparationNode,
  MultiplePassesNode,
  CleanupPathsNode,
  PierceOptimizationNode,
  MicroJointsNode,
  CutQualityNode,
  RotaryAttachmentNode,
  AirAssistNode,
  SafetyZonesNode,
  JobTimeEstimateNode,
  RobotKinematicsNode,
  PathPlanningNode,
  CollisionAvoidanceNode,
  EndEffectorSetupNode,
  WorkCellSetupNode,
  TrajectoryOptimizationNode,
  SingularityAvoidanceNode,
  RobotCalibrationNode,
  ForceControlNode,
  WeldingPathNode,
  PickAndPlaceNode,
  PalletizingPatternNode,
  RoboticMillingNode,
  SprayPaintingNode,
  AdditiveManufacturingNode,
  VisionGuidanceNode,
  MultiRobotCoordinationNode,
  ConveyorTrackingNode,
  SafetyZoneSetupNode,
  RobotSimulationNode,
  PostProcessorRobotNode,
  ReachAnalysisNode,
  JointLimitAvoidanceNode,
  ToolChangerSetupNode,
  RobotMaintenanceNode,
  StraightWallNode,
  CurvedWallNode,
  CompoundWallNode,
  CurtainWallNode,
  WallOpeningNode,
  WallJoinNode,
  RetainingWallNode,
  StudWallNode,
  InsulatedWallNode,
  TiltUpPanelNode,
  ParapetWallNode,
  FireWallNode,
  MovablePartitionNode,
  SoundproofWallNode,
  GreenWallNode,
  DoubleSkinnedFacadeNode,
  RainScreenNode,
  ShearWallNode,
  FoundationWallNode,
  HistoricWallRestorationNode,
  SlabOnGradeNode,
  CompositeFloorNode,
  RaisedFloorNode,
  WoodJoistFloorNode,
  PostTensionedSlabNode,
  SuspendedCeilingNode,
  CofferedCeilingNode,
  VaultedCeilingNode,
  MezzanineFloorNode,
  EpoxyFloorNode,
  RadiantFloorNode,
  AcousticCeilingNode,
  FloorDrainageNode,
  StretchCeilingNode,
  GreenRoofNode,
  FloorExpansionJointNode,
  SkyLightNode,
  FloorFinishNode,
  CeilingBeamNode,
  PedestalPaversNode,
  StraightStairNode,
  LShapedStairNode,
  UShapedStairNode,
  SpiralStairNode,
  HelicalStairNode,
  WinderStairNode,
  StraightRampNode,
  SwitchbackRampNode,
  HelicalRampNode,
  StairHandrailNode,
  StairBalustradeNode,
  StairNosingNode,
  StairStringerNode,
  EscapeStairNode,
  MonumentalStairNode,
  FloatingStairNode,
  LoadingDockNode,
  CurbRampNode,
  AlternatingTreadStairNode,
  VehicleRampNode,
  SingleDoorNode,
  DoubleDoorNode,
  SlidingDoorNode,
  RevolvingDoorNode,
  FoldingDoorNode,
  RollupDoorNode,
  CasementWindowNode,
  SlidingWindowNode,
  DoubleHungWindowNode,
  AwningWindowNode,
  BayWindowNode,
  BowWindowNode,
  ClerestroyWindowNode,
  FireDoorNode,
  SecurityDoorNode,
  StainedGlassWindowNode,
  OverheadDoorNode,
  JalousieWindowNode,
  DutchDoorNode,
  GothicWindowNode,
  SpurGearNode,
  HelicalGearNode,
  BevelGearNode,
  WormGearNode,
  WormShaftNode,
  RackGearNode,
  InternalGearNode,
  PlanetaryGearSetNode,
  TimingPulleyNode,
  ChainSprocketNode,
  CVTDiscNode,
  DifferentialGearNode,
  BallBearingNode,
  RollerBearingNode,
  ThrustBearingNode,
  NeedleBearingNode,
  LinearBearingNode,
  PillowBlockNode,
  FlangeBearingNode,
  BronzeBushingNode,
  SphericalBearingNode,
  AirBearingNode,
  HexBoltNode,
  SocketHeadCapScrewNode,
  HexNutNode,
  WasherNode,
  ThreadInsertNode,
  RivetNode,
  ClampingCollarNode,
  DowelNode,
  RetainingRingNode,
  KeywayJointNode,
  CompressionSpringNode,
  ExtensionSpringNode,
  TorsionSpringNode,
  LeafSpringNode,
  GasSpringNode,
  CamProfileNode,
  LinkageMechanismNode,
  RatchetMechanismNode,
  ClutchMechanismNode,
  UniversalJointNode,
  SteppedShaftNode,
  SplinedShaftNode,
  FlexibleShaftNode,
  HollowShaftNode,
  RigidCouplingNode,
  FlexibleCouplingNode,
  OldhamCouplingNode,
  FluidCouplingNode,
  PulleySystemNode,
  ChainDriveNode,
  CurvatureCombNode,
  CurveLengthNode,
  CurveSmoothnessAnalysisNode,
  CurveInflectionPointsNode,
  CurveTorsionNode,
  CurveDerivativesNode,
  CurveParameterNode,
  CurveEndpointsNode,
  CurveClosestPointNode,
  CurveExtremePointsNode,
  CurveAreaMomentsNode,
  CurveConvexHullNode,
  CurveBoundingBoxNode,
  CurveSpiralNode,
  SurfaceCurvatureNode,
  SurfaceNormalsNode,
  SurfaceAreaNode,
  SurfaceIsoCurvesNode,
  SurfaceParametrizationNode,
  SurfaceDerivativesNode,
  SurfaceClosestPointNode,
  SurfaceBoundaryNode,
  SurfaceContinuityNode,
  SurfaceFlatnessNode,
  SurfaceRoughnessNode,
  CurveCurveIntersectionNode,
  CurveSurfaceIntersectionNode,
  SurfaceSurfaceIntersectionNode,
  PlaneIntersectionNode,
  RayIntersectionNode,
  MinimumDistanceNode,
  ProximityAnalysisNode,
  ClearanceCheckNode,
  VisibilityAnalysisNode,
  ShadowAnalysisNode,
  VolumeCalculationNode,
  AngleMeasurementNode,
  DistanceMeasurementNode,
  GeometryValidationNode,
  MeshQualityNode,
  ToleranceAnalysisNode,
  STEPImportNode,
  STEPExportNode,
  IGESImportNode,
  IGESExportNode,
  STLImportNode,
  STLExportNode,
  OBJImportNode,
  OBJExportNode,
  PLYImportNode,
  PLYExportNode,
  ThreeMFImportNode,
  ThreeMFExportNode,
  DXFImportNode,
  DXFExportNode,
  SVGImportNode,
  SVGExportNode,
  SQLQueryNode,
  SQLInsertNode,
  HTTPRequestNode,
  JSONParserNode,
  JSONGeneratorNode,
  S3UploadNode,
  S3DownloadNode,
  EmailSenderNode,
  SlackNotificationNode,
  CSVReaderNode,
  CSVWriterNode,
  ExcelReaderNode,
  ExcelWriterNode,
  GrasshopperExportNode,
  WebSocketClientNode,
  MQTTPublisherNode,
  MQTTSubscriberNode,
  SerialPortNode,
  TCPClientNode,
  GeneticOptimizerNode,
  ParticleSwarmOptimizerNode,
  SimulatedAnnealingNode,
  GradientDescentNode,
  TopologyOptimizerNode,
  LinearRegressionNode,
  DecisionTreeNode,
  NeuralNetworkNode,
  SupportVectorMachineNode,
  ConvexHull3DNode,
  VisibilityGraphNode,
  MedialAxisNode,
  MarchingCubesNode,
  SpacePartitioningNode,
  VoxelGridNode,
  PointCloudProcessingNode,
  SurfaceReconstructionNode,
  GeometrySimplificationNode,
  GeometryMatchingNode,
  ShapeDescriptorNode,
  GeometricReactionDiffusionNode,
  AlgorithmicSubdivisionSurfaceNode,
  CNCCollisionDetectionNode,
  AnalysisSurfaceDeviationNode,
  ProximityCollisionDetectionNode,
  AlgorithmicKMeansClusteringNode,
  AlgorithmicShortestPathNode,
  MachineLearningKMeansClusteringNode,
  GeometryAlphaShapeNode,
  GeometryMinimumSpanningTreeNode,
  GeometryShortestPathNode,
  GeometryDistanceFieldNode};

// Registry for dynamic loading
export const nodeRegistry = {
  'SimpleHoleNode': SimpleHoleNode,
  'CounterboreHoleNode': CounterboreHoleNode,
  'CountersinkHoleNode': CountersinkHoleNode,
  'ThreadedHoleNode': ThreadedHoleNode,
  'RectangularPocketNode': RectangularPocketNode,
  'CircularPocketNode': CircularPocketNode,
  'LinearRibNode': LinearRibNode,
  'MountingBossNode': MountingBossNode,
  'LinearPatternNode': LinearPatternNode,
  'CircularPatternNode': CircularPatternNode,
  'RectangularPatternNode': RectangularPatternNode,
  'MoveNode': MoveNode,
  'RotateNode': RotateNode,
  'ScaleNode': ScaleNode,
  'MirrorNode': MirrorNode,
  'LinearArrayNode': LinearArrayNode,
  'PolarArrayNode': PolarArrayNode,
  'PathArrayNode': PathArrayNode,
  'GridArrayNode': GridArrayNode,
  'AlignNode': AlignNode,
  'OrientNode': OrientNode,
  'ProjectToPlaneNode': ProjectToPlaneNode,
  'WrapNode': WrapNode,
  AdvancedWrapNode,
  'DeformNode': DeformNode,
  AdvancedDeformNode,
  'BoundingBoxAlignNode': BoundingBoxAlignNode,
  'MatrixTransformNode': MatrixTransformNode,
  'PrismNode': PrismNode,
  'WedgeNode': WedgeNode,
  'PyramidNode': PyramidNode,
  'BezierSurfaceNode': BezierSurfaceNode,
  'BSplineSurfaceNode': BSplineSurfaceNode,
  'RuledSurfaceNode': RuledSurfaceNode,
  'HelixNode': HelixNode,
  'SpringNode': SpringNode,
  'ThreadNode': ThreadNode,
  'BoxNode': BoxNode,
  'SphereNode': SphereNode,
  'CylinderNode': CylinderNode,
  'ConeNode': ConeNode,
  'TorusNode': TorusNode,
  'EllipsoidNode': EllipsoidNode,
  'CapsuleNode': CapsuleNode,
  'RoundedBoxNode': RoundedBoxNode,
  'PipeNode': PipeNode,
  'PolyhedronNode': PolyhedronNode,
  'EllipseNode': EllipseNode,
  'ParabolaNode': ParabolaNode,
  'HyperbolaNode': HyperbolaNode,
  'SpiralNode': SpiralNode,
  'PolygonNode': PolygonNode,
  'StarNode': StarNode,
  'GearNode': GearNode,
  AssemblyGearNode,
  'LineNode': LineNode,
  'ArcNode': ArcNode,
  'CircleNode': CircleNode,
  'RectangleNode': RectangleNode,
  'PolylineNode': PolylineNode,
  'SplineNode': SplineNode,
  'BezierCurveNode': BezierCurveNode,
  'BSplineCurveNode': BSplineCurveNode,
  'PointNode': PointNode,
  'SlotNode': SlotNode,
  AssemblyMatesSlotNode,
  SheetMetalSlotNode,
  'TextNode': TextNode,
  'OffsetNode': OffsetNode,
  'Fillet2DNode': Fillet2DNode,
  'Chamfer2DNode': Chamfer2DNode,
  'TrimNode': TrimNode,
  'UnionNode': UnionNode,
  'DifferenceNode': DifferenceNode,
  'IntersectionNode': IntersectionNode,
  'XORNode': XORNode,
  'SplitNode': SplitNode,
  'FragmentNode': FragmentNode,
  'CommonEdgesNode': CommonEdgesNode,
  'ImprintNode': ImprintNode,
  'GlueNode': GlueNode,
  'CompoundNode': CompoundNode,
  'CoincidentNode': CoincidentNode,
  'ParallelNode': ParallelNode,
  'PerpendicularNode': PerpendicularNode,
  'TangentNode': TangentNode,
  MathTangentNode,
  'ConcentricNode': ConcentricNode,
  'DistanceNode': DistanceNode,
  'AngleNode': AngleNode,
  'HorizontalNode': HorizontalNode,
  'VerticalNode': VerticalNode,
  'FixedNode': FixedNode,
  AssemblyJointsFixedNode,
  'FaceToFaceNode': FaceToFaceNode,
  'EdgeToEdgeNode': EdgeToEdgeNode,
  'PointToPointNode': PointToPointNode,
  'AxisToAxisNode': AxisToAxisNode,
  'PlaneToPlaneNode': PlaneToPlaneNode,
  'FastenedNode': FastenedNode,
  'CamNode': CamNode,
  'PathNode': PathNode,
  'RevoluteNode': RevoluteNode,
  'PrismaticNode': PrismaticNode,
  'CylindricalNode': CylindricalNode,
  'SphericalNode': SphericalNode,
  'PlanarNode': PlanarNode,
  'UniversalNode': UniversalNode,
  'ScrewNode': ScrewNode,
  'BeltNode': BeltNode,
  'RackPinionNode': RackPinionNode,
  'ComponentPatternNode': ComponentPatternNode,
  'FlexibleSubAssemblyNode': FlexibleSubAssemblyNode,
  'ConfigurationNode': ConfigurationNode,
  'ExplodedViewNode': ExplodedViewNode,
  'BillOfMaterialsNode': BillOfMaterialsNode,
  'InterferenceCheckNode': InterferenceCheckNode,
  'MotionStudyNode': MotionStudyNode,
  'EnvelopeNode': EnvelopeNode,
  'SmartFastenersNode': SmartFastenersNode,
  'ContactSetNode': ContactSetNode,
  'EdgeFlangeNode': EdgeFlangeNode,
  'ContourFlangeNode': ContourFlangeNode,
  'MiterFlangeNode': MiterFlangeNode,
  'SketchedBendNode': SketchedBendNode,
  'HemNode': HemNode,
  'JogNode': JogNode,
  'CornerReliefNode': CornerReliefNode,
  'BendReliefNode': BendReliefNode,
  'ClosedCornerNode': ClosedCornerNode,
  'TabNode': TabNode,
  'LouverNode': LouverNode,
  'LanceNode': LanceNode,
  'BeadNode': BeadNode,
  'UnfoldNode': UnfoldNode,
  'FoldNode': FoldNode,
  'ExportDXFNode': ExportDXFNode,
  DrawingExportDXFNode,
  'SheetMetalStyleNode': SheetMetalStyleNode,
  'BendTableNode': BendTableNode,
  'CostEstimateNode': CostEstimateNode,
  'SweepNode': SweepNode,
  'HelicalSweepNode': HelicalSweepNode,
  'LoftNode': LoftNode,
  'BlendSurfaceNode': BlendSurfaceNode,
  'BoundaryNode': BoundaryNode,
  'ShellNode': ShellNode,
  'VariableShellNode': VariableShellNode,
  'ThickenNode': ThickenNode,
  'OffsetSurfaceNode': OffsetSurfaceNode,
  'DraftNode': DraftNode,
  'PartingLineDraftNode': PartingLineDraftNode,
  'StepDraftNode': StepDraftNode,
  'TrimSurfaceNode': TrimSurfaceNode,
  'ExtendSurfaceNode': ExtendSurfaceNode,
  'UntrimSurfaceNode': UntrimSurfaceNode,
  'KnitSurfacesNode': KnitSurfacesNode,
  'PatchSurfaceNode': PatchSurfaceNode,
  'DomeNode': DomeNode,
  'FlexNode': FlexNode,
  'IndentNode': IndentNode,
  'HealShapeNode': HealShapeNode,
  'RemoveFeaturesNode': RemoveFeaturesNode,
  'DeleteFaceNode': DeleteFaceNode,
  'SimplifyShapeNode': SimplifyShapeNode,
  'CheckGeometryNode': CheckGeometryNode,
  'NurbsSurfaceNode': NurbsSurfaceNode,
  'NetworkSurfaceNode': NetworkSurfaceNode,
  'SurfaceFromPointsNode': SurfaceFromPointsNode,
  'CoonsPatchNode': CoonsPatchNode,
  'GordonSurfaceNode': GordonSurfaceNode,
  'NurbsCurveNode': NurbsCurveNode,
  'InterpolateCurveNode': InterpolateCurveNode,
  'ApproximateCurveNode': ApproximateCurveNode,
  'BlendCurveNode': BlendCurveNode,
  'CompositeCurveNode': CompositeCurveNode,
  'CurvatureAnalysisNode': CurvatureAnalysisNode,
  'ZebraAnalysisNode': ZebraAnalysisNode,
  'DraftAnalysisNode': DraftAnalysisNode,
  'ContinuityCheckNode': ContinuityCheckNode,
  'SurfaceDeviationNode': SurfaceDeviationNode,
  'ReflectionLinesNode': ReflectionLinesNode,
  'IsocurveExtractNode': IsocurveExtractNode,
  'SectionCurvesNode': SectionCurvesNode,
  'ProjectCurveNode': ProjectCurveNode,
  'IntersectCurvesNode': IntersectCurvesNode,
  'CurveOnSurfaceNode': CurveOnSurfaceNode,
  'GeodesicCurveNode': GeodesicCurveNode,
  'IsoparametricCurveNode': IsoparametricCurveNode,
  'TessellateNode': TessellateNode,
  'AdaptiveTessellationNode': AdaptiveTessellationNode,
  'RemeshUniformNode': RemeshUniformNode,
  'QuadMeshNode': QuadMeshNode,
  'VoxelMeshNode': VoxelMeshNode,
  'RepairMeshNode': RepairMeshNode,
  'SimplifyMeshNode': SimplifyMeshNode,
  'FillHolesNode': FillHolesNode,
  'SmoothMeshNode': SmoothMeshNode,
  'DecimateMeshNode': DecimateMeshNode,
  'SubdivideMeshNode': SubdivideMeshNode,
  'MeshBooleanNode': MeshBooleanNode,
  'MeshOffsetNode': MeshOffsetNode,
  'ImportSTLNode': ImportSTLNode,
  'ExportSTLNode': ExportSTLNode,
  'ImportOBJNode': ImportOBJNode,
  'ExportOBJNode': ExportOBJNode,
  'ImportPLYNode': ImportPLYNode,
  'Export3MFNode': Export3MFNode,
  'MeshToShapeNode': MeshToShapeNode,
  'ImportSTEPNode': ImportSTEPNode,
  'ExportSTEPNode': ExportSTEPNode,
  'ImportIGESNode': ImportIGESNode,
  'ExportIGESNode': ExportIGESNode,
  'ImportBREPNode': ImportBREPNode,
  'ExportBREPNode': ExportBREPNode,
  'ImportParasolidNode': ImportParasolidNode,
  'ImportACISNode': ImportACISNode,
  'ImportDXFNode': ImportDXFNode,
  'ExportSVGNode': ExportSVGNode,
  'ImportGLTFNode': ImportGLTFNode,
  'ExportGLTFNode': ExportGLTFNode,
  'ImportJSONNode': ImportJSONNode,
  'ExportJSONNode': ExportJSONNode,
  'Text3DNode': Text3DNode,
  'EngraveNode': EngraveNode,
  'EmbossNode': EmbossNode,
  'SerialNumberNode': SerialNumberNode,
  'BarcodeNode': BarcodeNode,
  'LatticeStructureNode': LatticeStructureNode,
  'TPMSNode': TPMSNode,
  'VoronoiLatticeNode': VoronoiLatticeNode,
  'GradedLatticeNode': GradedLatticeNode,
  'ConformLatticeNode': ConformLatticeNode,
  'HoneycombStructureNode': HoneycombStructureNode,
  'TopologyOptimizeNode': TopologyOptimizeNode,
  'ShapeOptimizeNode': ShapeOptimizeNode,
  'GenerativeDesignNode': GenerativeDesignNode,
  'LightweightStructureNode': LightweightStructureNode,
  'StressReliefNode': StressReliefNode,
  'PackingOptimizeNode': PackingOptimizeNode,
  'MetaBallsNode': MetaBallsNode,
  'SubdivisionSurfaceNode': SubdivisionSurfaceNode,
  'FractalGeometryNode': FractalGeometryNode,
  'ReactionDiffusionNode': ReactionDiffusionNode,
  'BiomimeticStructureNode': BiomimeticStructureNode,
  'MeshForFEANode': MeshForFEANode,
  'ApplyLoadsNode': ApplyLoadsNode,
  'ApplyConstraintsNode': ApplyConstraintsNode,
  'MaterialAssignNode': MaterialAssignNode,
  'ExportFEANode': ExportFEANode,
  'FluidDomainNode': FluidDomainNode,
  'BoundaryLayersNode': BoundaryLayersNode,
  'InletOutletNode': InletOutletNode,
  'FluidPropertiesNode': FluidPropertiesNode,
  'ExportCFDNode': ExportCFDNode,
  'JointDefinitionNode': JointDefinitionNode,
  'MotionDriverNode': MotionDriverNode,
  'CollisionDetectionNode': CollisionDetectionNode,
  'ForwardKinematicsNode': ForwardKinematicsNode,
  'InverseKinematicsNode': InverseKinematicsNode,
  'AddNode': AddNode,
  'SubtractNode': SubtractNode,
  'MultiplyNode': MultiplyNode,
  'DivideNode': DivideNode,
  'PowerNode': PowerNode,
  'ModuloNode': ModuloNode,
  'AbsoluteNode': AbsoluteNode,
  'NegateNode': NegateNode,
  'SquareRootNode': SquareRootNode,
  'FactorialNode': FactorialNode,
  'SineNode': SineNode,
  'CosineNode': CosineNode,
  'ArcSineNode': ArcSineNode,
  'ArcCosineNode': ArcCosineNode,
  'ArcTangentNode': ArcTangentNode,
  'ArcTangent2Node': ArcTangent2Node,
  'HyperbolicSineNode': HyperbolicSineNode,
  'HyperbolicCosineNode': HyperbolicCosineNode,
  'HyperbolicTangentNode': HyperbolicTangentNode,
  'NaturalLogNode': NaturalLogNode,
  'Log10Node': Log10Node,
  'LogBaseNode': LogBaseNode,
  'ExponentialNode': ExponentialNode,
  'Exp10Node': Exp10Node,
  'RoundNode': RoundNode,
  'FloorNode': FloorNode,
  'CeilingNode': CeilingNode,
  'TruncateNode': TruncateNode,
  'RoundToDecimalNode': RoundToDecimalNode,
  'MinNode': MinNode,
  'MaxNode': MaxNode,
  'ClampNode': ClampNode,
  'SignNode': SignNode,
  'IsEqualNode': IsEqualNode,
  'AverageNode': AverageNode,
  'MedianNode': MedianNode,
  'ModeNode': ModeNode,
  'StandardDeviationNode': StandardDeviationNode,
  'VarianceNode': VarianceNode,
  'SumNode': SumNode,
  'ProductNode': ProductNode,
  'RangeNode': RangeNode,
  'PercentileNode': PercentileNode,
  'CorrelationNode': CorrelationNode,
  'RandomNode': RandomNode,
  'RandomRangeNode': RandomRangeNode,
  'RandomIntegerNode': RandomIntegerNode,
  'RandomNormalNode': RandomNormalNode,
  'RandomPoissonNode': RandomPoissonNode,
  'RandomExponentialNode': RandomExponentialNode,
  'RandomChoiceNode': RandomChoiceNode,
  'ShuffleNode': ShuffleNode,
  'PerlinNoiseNode': PerlinNoiseNode,
  'SimplexNoiseNode': SimplexNoiseNode,
  'LerpNode': LerpNode,
  'InverseLerpNode': InverseLerpNode,
  'RemapNode': RemapNode,
  'SmoothStepNode': SmoothStepNode,
  'SmootherStepNode': SmootherStepNode,
  'CubicInterpNode': CubicInterpNode,
  'HermiteInterpNode': HermiteInterpNode,
  'BezierInterpNode': BezierInterpNode,
  'EaseInNode': EaseInNode,
  'EaseOutNode': EaseOutNode,
  'EaseInOutNode': EaseInOutNode,
  'SpringInterpNode': SpringInterpNode,
  'ComplexNumberNode': ComplexNumberNode,
  'ComplexAddNode': ComplexAddNode,
  'ComplexMultiplyNode': ComplexMultiplyNode,
  'ComplexConjugateNode': ComplexConjugateNode,
  'ComplexMagnitudeNode': ComplexMagnitudeNode,
  'ComplexPhaseNode': ComplexPhaseNode,
  'MatrixMultiplyNode': MatrixMultiplyNode,
  'MatrixInverseNode': MatrixInverseNode,
  'MatrixDeterminantNode': MatrixDeterminantNode,
  'MatrixTransposeNode': MatrixTransposeNode,
  'ListLengthNode': ListLengthNode,
  'ListItemNode': ListItemNode,
  'ListSliceNode': ListSliceNode,
  'ListReverseNode': ListReverseNode,
  'ListSortNode': ListSortNode,
  'ListShuffleNode': ListShuffleNode,
  'ListShiftNode': ListShiftNode,
  'ListInsertNode': ListInsertNode,
  'ListRemoveNode': ListRemoveNode,
  'ListReplaceNode': ListReplaceNode,
  'ListAppendNode': ListAppendNode,
  'ListPrependNode': ListPrependNode,
  'ListJoinNode': ListJoinNode,
  'ListSplitNode': ListSplitNode,
  'ListPartitionNode': ListPartitionNode,
  'ListFlattenNode': ListFlattenNode,
  'ListUniqueNode': ListUniqueNode,
  'ListContainsNode': ListContainsNode,
  'ListFindNode': ListFindNode,
  'ListFilterNode': ListFilterNode,
  'SetUnionNode': SetUnionNode,
  'SetIntersectionNode': SetIntersectionNode,
  'SetDifferenceNode': SetDifferenceNode,
  'SetSymmetricDifferenceNode': SetSymmetricDifferenceNode,
  'SetSubsetNode': SetSubsetNode,
  'SetCartesianProductNode': SetCartesianProductNode,
  'SetPowerSetNode': SetPowerSetNode,
  'SetCombinationsNode': SetCombinationsNode,
  'SetPermutationsNode': SetPermutationsNode,
  'SetPartitionsNode': SetPartitionsNode,
  'TreeBranchNode': TreeBranchNode,
  'TreePathsNode': TreePathsNode,
  'TreeGraftNode': TreeGraftNode,
  'TreeFlattenNode': TreeFlattenNode,
  'TreeSimplifyNode': TreeSimplifyNode,
  'TreePruneNode': TreePruneNode,
  'TreeMergeNode': TreeMergeNode,
  'TreeExplodeNode': TreeExplodeNode,
  'TreeShiftNode': TreeShiftNode,
  'TreeStatisticsNode': TreeStatisticsNode,
  'StringConcatNode': StringConcatNode,
  'StringSplitNode': StringSplitNode,
  'StringReplaceNode': StringReplaceNode,
  'StringFormatNode': StringFormatNode,
  'StringCaseNode': StringCaseNode,
  'StringTrimNode': StringTrimNode,
  'StringLengthNode': StringLengthNode,
  'StringSubstringNode': StringSubstringNode,
  'StringContainsNode': StringContainsNode,
  'StringMatchNode': StringMatchNode,
  'ToStringNode': ToStringNode,
  'ToNumberNode': ToNumberNode,
  'ToBooleanNode': ToBooleanNode,
  'ToJSONNode': ToJSONNode,
  'FromJSONNode': FromJSONNode,
  'ToCSVNode': ToCSVNode,
  'FromCSVNode': FromCSVNode,
  'ToBase64Node': ToBase64Node,
  'FromBase64Node': FromBase64Node,
  'TypeOfNode': TypeOfNode,
  'LinearFieldNode': LinearFieldNode,
  'RadialFieldNode': RadialFieldNode,
  'SphericalFieldNode': SphericalFieldNode,
  'CylindricalFieldNode': CylindricalFieldNode,
  'NoiseFieldNode': NoiseFieldNode,
  'SineFieldNode': SineFieldNode,
  'VectorFieldNode': VectorFieldNode,
  'ImageFieldNode': ImageFieldNode,
  'DistanceFieldNode': DistanceFieldNode,
  'ChargeFieldNode': ChargeFieldNode,
  'PointAttractorNode': PointAttractorNode,
  'CurveAttractorNode': CurveAttractorNode,
  'SurfaceAttractorNode': SurfaceAttractorNode,
  'MeshAttractorNode': MeshAttractorNode,
  'SpinAttractorNode': SpinAttractorNode,
  'DirectionalAttractorNode': DirectionalAttractorNode,
  'TwistAttractorNode': TwistAttractorNode,
  'VortexAttractorNode': VortexAttractorNode,
  'GravityAttractorNode': GravityAttractorNode,
  'FlowAttractorNode': FlowAttractorNode,
  'FieldAddNode': FieldAddNode,
  'FieldSubtractNode': FieldSubtractNode,
  'FieldMultiplyNode': FieldMultiplyNode,
  'FieldDivideNode': FieldDivideNode,
  'FieldMinNode': FieldMinNode,
  'FieldMaxNode': FieldMaxNode,
  'FieldBlendNode': FieldBlendNode,
  'FieldRemapNode': FieldRemapNode,
  'FieldClampNode': FieldClampNode,
  'FieldInvertNode': FieldInvertNode,
  'FieldGradientNode': FieldGradientNode,
  'FieldDivergenceNode': FieldDivergenceNode,
  'FieldCurlNode': FieldCurlNode,
  'FieldLaplacianNode': FieldLaplacianNode,
  'FieldSmoothNode': FieldSmoothNode,
  'SampleFieldNode': SampleFieldNode,
  'FieldLineNode': FieldLineNode,
  'IsoContourNode': IsoContourNode,
  'IsoSurfaceNode': IsoSurfaceNode,
  'FieldGridNode': FieldGridNode,
  'FieldDeformNode': FieldDeformNode,
  'FieldDisplaceNode': FieldDisplaceNode,
  'FieldScaleNode': FieldScaleNode,
  'FieldRotateNode': FieldRotateNode,
  'FieldColorNode': FieldColorNode,
  'FieldColorMapNode': FieldColorMapNode,
  'FieldVectorArrowsNode': FieldVectorArrowsNode,
  'FieldStreamLinesNode': FieldStreamLinesNode,
  'FieldHeatMapNode': FieldHeatMapNode,
  'FieldVolumeNode': FieldVolumeNode,
  'FieldMinMaxNode': FieldMinMaxNode,
  'FieldAverageNode': FieldAverageNode,
  'FieldCriticalPointsNode': FieldCriticalPointsNode,
  'FieldDivergenceAnalysisNode': FieldDivergenceAnalysisNode,
  'FieldCurlAnalysisNode': FieldCurlAnalysisNode,
  'FieldFluxNode': FieldFluxNode,
  'FieldCirculationNode': FieldCirculationNode,
  'FieldPotentialNode': FieldPotentialNode,
  'FieldHistogramNode': FieldHistogramNode,
  'FieldCorrelationNode': FieldCorrelationNode,
  'FieldMorphingNode': FieldMorphingNode,
  'FieldWarpNode': FieldWarpNode,
  'FieldConvolutionNode': FieldConvolutionNode,
  'FieldFourierNode': FieldFourierNode,
  'FieldOptimizeNode': FieldOptimizeNode,
  'Voronoi2DNode': Voronoi2DNode,
  'Voronoi3DNode': Voronoi3DNode,
  'WeightedVoronoiNode': WeightedVoronoiNode,
  'CentroidalVoronoiNode': CentroidalVoronoiNode,
  'VoronoiOnSurfaceNode': VoronoiOnSurfaceNode,
  'Delaunay2DNode': Delaunay2DNode,
  'Delaunay3DNode': Delaunay3DNode,
  'ConstrainedDelaunayNode': ConstrainedDelaunayNode,
  'AlphaShapeNode': AlphaShapeNode,
  'VoronoiFractureNode': VoronoiFractureNode,
  'VoronoiGrowthNode': VoronoiGrowthNode,
  'DelaunayMeshNode': DelaunayMeshNode,
  'VoronoiSkeletonNode': VoronoiSkeletonNode,
  'VoronoiOffsetNode': VoronoiOffsetNode,
  'ConvexHullNode': ConvexHullNode,
  'IslamicStarNode': IslamicStarNode,
  'GirihTilingNode': GirihTilingNode,
  'ArabesqueNode': ArabesqueNode,
  'MoorishPatternNode': MoorishPatternNode,
  'IslamicGridNode': IslamicGridNode,
  'CelticKnotNode': CelticKnotNode,
  'CelticBraidNode': CelticBraidNode,
  'PenroseTilingNode': PenroseTilingNode,
  'TruchetTilesNode': TruchetTilesNode,
  'SpiralPatternNode': SpiralPatternNode,
  'MandalaPatternNode': MandalaPatternNode,
  'PolygonalTessellationNode': PolygonalTessellationNode,
  'CirclePackingNode': CirclePackingNode,
  'HyperbolicTilingNode': HyperbolicTilingNode,
  'GeodesicPatternNode': GeodesicPatternNode,
  'MuqarnasNode': MuqarnasNode,
  'QuasiCrystalNode': QuasiCrystalNode,
  'MinimalSurfaceNode': MinimalSurfaceNode,
  'ParquetDeformationNode': ParquetDeformationNode,
  'KochSnowflakeNode': KochSnowflakeNode,
  'SierpinskiTriangleNode': SierpinskiTriangleNode,
  'MengerSpongeNode': MengerSpongeNode,
  'JuliaSetNode': JuliaSetNode,
  'MandelbrotSetNode': MandelbrotSetNode,
  'LSystem2DNode': LSystem2DNode,
  'LSystem3DNode': LSystem3DNode,
  'TreeGeneratorNode': TreeGeneratorNode,
  'DragonCurveNode': DragonCurveNode,
  'HilbertCurveNode': HilbertCurveNode,
  'PeanoCurveNode': PeanoCurveNode,
  'CantorSetNode': CantorSetNode,
  'PlantGrowthNode': PlantGrowthNode,
  'BarnsleyFernNode': BarnsleyFernNode,
  'ApollonianGasketNode': ApollonianGasketNode,
  'RectanglePackingNode': RectanglePackingNode,
  'SpherePackingNode': SpherePackingNode,
  'PolygonPackingNode': PolygonPackingNode,
  'CubicLatticeNode': CubicLatticeNode,
  'OctetLatticeNode': OctetLatticeNode,
  'DiamondLatticeNode': DiamondLatticeNode,
  'KelvinLatticeNode': KelvinLatticeNode,
  'TPMSLatticeNode': TPMSLatticeNode,
  'BrickPatternNode': BrickPatternNode,
  'ParquetPatternNode': ParquetPatternNode,
  'WeavePatternNode': WeavePatternNode,
  'HoneycombPatternNode': HoneycombPatternNode,
  'FoamStructureNode': FoamStructureNode,
  'CellularAutomataNode': CellularAutomataNode,
  'ConwayLifeNode': ConwayLifeNode,
  'PoissonDiskNode': PoissonDiskNode,
  'BlueNoiseNode': BlueNoiseNode,
  'JitteredGridNode': JitteredGridNode,
  'MinimumSpanningTreeNode': MinimumSpanningTreeNode,
  'RelativeNeighborhoodNode': RelativeNeighborhoodNode,
  'BinaryTreeNode': BinaryTreeNode,
  'MazeGeneratorNode': MazeGeneratorNode,
  'FlockingPatternNode': FlockingPatternNode,
  'DiffusionLimitedAggregationNode': DiffusionLimitedAggregationNode,
  'GrammarShapesNode': GrammarShapesNode,
  'WaveFunctionCollapseNode': WaveFunctionCollapseNode,
  'MarkovChainNode': MarkovChainNode,
  'GeneticAlgorithmNode': GeneticAlgorithmNode,
  'NeuralPatternNode': NeuralPatternNode,
  'StrangeAttractorNode': StrangeAttractorNode,
  'PhyllotaxisPatternNode': PhyllotaxisPatternNode,
  'TuringPatternNode': TuringPatternNode,
  'NoisePatternNode': NoisePatternNode,
  'PackingCirclesNode': PackingCirclesNode,

  'ContextFreeArtNode': ContextFreeArtNode,
  'ProceduralTextureNode': ProceduralTextureNode,
  'GraphLayoutNode': GraphLayoutNode,

  'SupportGenerationNode': SupportGenerationNode,
  'PrintOrientationNode': PrintOrientationNode,
  'SliceModelNode': SliceModelNode,
  'BridgeDetectionNode': BridgeDetectionNode,
  'WallThicknessNode': WallThicknessNode,
  'PrintTimeEstimateNode': PrintTimeEstimateNode,
  'RaftGenerationNode': RaftGenerationNode,
  'BrimGenerationNode': BrimGenerationNode,
  'SeamOptimizationNode': SeamOptimizationNode,
  'InfillOptimizationNode': InfillOptimizationNode,
  'CoolingAnalysisNode': CoolingAnalysisNode,
  'RetractionOptimizationNode': RetractionOptimizationNode,
  'VaseModeNode': VaseModeNode,
  'MultiMaterialSetupNode': MultiMaterialSetupNode,
  'TreeSupportsNode': TreeSupportsNode,
  'IroningPassNode': IroningPassNode,
  'FuzzySkinnNode': FuzzySkinnNode,
  'CoastingSetupNode': CoastingSetupNode,
  'WipeTowerNode': WipeTowerNode,
  'AdaptiveLayerHeightNode': AdaptiveLayerHeightNode,
  'PerimeterGeneratorNode': PerimeterGeneratorNode,
  'GCodePostProcessorNode': GCodePostProcessorNode,
  'NonPlanarSlicingNode': NonPlanarSlicingNode,
  'ConicalSlicingNode': ConicalSlicingNode,
  'SolubleSupportInterfaceNode': SolubleSupportInterfaceNode,
  'ToolpathGenerationNode': ToolpathGenerationNode,
  'PocketingStrategyNode': PocketingStrategyNode,
  'ContouringToolpathNode': ContouringToolpathNode,
  'DrillingOperationNode': DrillingOperationNode,
  'ThreadMillingNode': ThreadMillingNode,
  'AdaptiveClearingNode': AdaptiveClearingNode,
  'TrochoidalMillingNode': TrochoidalMillingNode,
  'RestMachiningNode': RestMachiningNode,
  'ToolCompensationNode': ToolCompensationNode,
  'HelicalEntryNode': HelicalEntryNode,
  'RampEntryNode': RampEntryNode,
  'HighSpeedMachiningNode': HighSpeedMachiningNode,
  'ScallopHeightNode': ScallopHeightNode,
  'FeedsAndSpeedsNode': FeedsAndSpeedsNode,
  'FiveAxisPositioningNode': FiveAxisPositioningNode,
  'SwarmMillingNode': SwarmMillingNode,
  'ToolLibraryNode': ToolLibraryNode,
  'WorkCoordinateNode': WorkCoordinateNode,
  'PostProcessorNode': PostProcessorNode,
  'ChipEvacuationNode': ChipEvacuationNode,
  'CutterEngagementNode': CutterEngagementNode,
  'ToolWearNode': ToolWearNode,
  'SetupSheetsNode': SetupSheetsNode,
  'ProbeRoutineNode': ProbeRoutineNode,
  'LaserPathNode': LaserPathNode,
  'TabsAndSlotsNode': TabsAndSlotsNode,
  'LivingHingeNode': LivingHingeNode,
  'KerfBendingNode': KerfBendingNode,
  'PowerMappingNode': PowerMappingNode,
  'EngraveRasterNode': EngraveRasterNode,
  'VectorEngraveNode': VectorEngraveNode,
  'NestingOptimizationNode': NestingOptimizationNode,
  'CutOrderOptimizationNode': CutOrderOptimizationNode,
  'LeadInOutNode': LeadInOutNode,
  'BridgeGenerationNode': BridgeGenerationNode,
  'FocusCompensationNode': FocusCompensationNode,
  'HatchFillNode': HatchFillNode,
  'TextEngravingNode': TextEngravingNode,
  'MaterialDatabaseNode': MaterialDatabaseNode,
  'LayerSeparationNode': LayerSeparationNode,
  'MultiplePassesNode': MultiplePassesNode,
  'CleanupPathsNode': CleanupPathsNode,
  'PierceOptimizationNode': PierceOptimizationNode,
  'MicroJointsNode': MicroJointsNode,
  'CutQualityNode': CutQualityNode,
  'RotaryAttachmentNode': RotaryAttachmentNode,
  'AirAssistNode': AirAssistNode,
  'SafetyZonesNode': SafetyZonesNode,
  'JobTimeEstimateNode': JobTimeEstimateNode,
  'RobotKinematicsNode': RobotKinematicsNode,
  'PathPlanningNode': PathPlanningNode,
  'CollisionAvoidanceNode': CollisionAvoidanceNode,
  'EndEffectorSetupNode': EndEffectorSetupNode,
  'WorkCellSetupNode': WorkCellSetupNode,
  'TrajectoryOptimizationNode': TrajectoryOptimizationNode,
  'SingularityAvoidanceNode': SingularityAvoidanceNode,
  'RobotCalibrationNode': RobotCalibrationNode,
  'ForceControlNode': ForceControlNode,
  'WeldingPathNode': WeldingPathNode,
  'PickAndPlaceNode': PickAndPlaceNode,
  'PalletizingPatternNode': PalletizingPatternNode,
  'RoboticMillingNode': RoboticMillingNode,
  'SprayPaintingNode': SprayPaintingNode,
  'AdditiveManufacturingNode': AdditiveManufacturingNode,
  'VisionGuidanceNode': VisionGuidanceNode,
  'MultiRobotCoordinationNode': MultiRobotCoordinationNode,
  'ConveyorTrackingNode': ConveyorTrackingNode,
  'SafetyZoneSetupNode': SafetyZoneSetupNode,
  'RobotSimulationNode': RobotSimulationNode,
  'PostProcessorRobotNode': PostProcessorRobotNode,
  'ReachAnalysisNode': ReachAnalysisNode,
  'JointLimitAvoidanceNode': JointLimitAvoidanceNode,
  'ToolChangerSetupNode': ToolChangerSetupNode,
  'RobotMaintenanceNode': RobotMaintenanceNode,
  'StraightWallNode': StraightWallNode,
  'CurvedWallNode': CurvedWallNode,
  'CompoundWallNode': CompoundWallNode,
  'CurtainWallNode': CurtainWallNode,
  'WallOpeningNode': WallOpeningNode,
  'WallJoinNode': WallJoinNode,
  'RetainingWallNode': RetainingWallNode,
  'StudWallNode': StudWallNode,
  'InsulatedWallNode': InsulatedWallNode,
  'TiltUpPanelNode': TiltUpPanelNode,
  'ParapetWallNode': ParapetWallNode,
  'FireWallNode': FireWallNode,
  'MovablePartitionNode': MovablePartitionNode,
  'SoundproofWallNode': SoundproofWallNode,
  'GreenWallNode': GreenWallNode,
  'DoubleSkinnedFacadeNode': DoubleSkinnedFacadeNode,
  'RainScreenNode': RainScreenNode,
  'ShearWallNode': ShearWallNode,
  'FoundationWallNode': FoundationWallNode,
  'HistoricWallRestorationNode': HistoricWallRestorationNode,
  'SlabOnGradeNode': SlabOnGradeNode,
  'CompositeFloorNode': CompositeFloorNode,
  'RaisedFloorNode': RaisedFloorNode,
  'WoodJoistFloorNode': WoodJoistFloorNode,
  'PostTensionedSlabNode': PostTensionedSlabNode,
  'SuspendedCeilingNode': SuspendedCeilingNode,
  'CofferedCeilingNode': CofferedCeilingNode,
  'VaultedCeilingNode': VaultedCeilingNode,
  'MezzanineFloorNode': MezzanineFloorNode,
  'EpoxyFloorNode': EpoxyFloorNode,
  'RadiantFloorNode': RadiantFloorNode,
  'AcousticCeilingNode': AcousticCeilingNode,
  'FloorDrainageNode': FloorDrainageNode,
  'StretchCeilingNode': StretchCeilingNode,
  'GreenRoofNode': GreenRoofNode,
  'FloorExpansionJointNode': FloorExpansionJointNode,
  'SkyLightNode': SkyLightNode,
  'FloorFinishNode': FloorFinishNode,
  'CeilingBeamNode': CeilingBeamNode,
  'PedestalPaversNode': PedestalPaversNode,
  'StraightStairNode': StraightStairNode,
  'LShapedStairNode': LShapedStairNode,
  'UShapedStairNode': UShapedStairNode,
  'SpiralStairNode': SpiralStairNode,
  'HelicalStairNode': HelicalStairNode,
  'WinderStairNode': WinderStairNode,
  'StraightRampNode': StraightRampNode,
  'SwitchbackRampNode': SwitchbackRampNode,
  'HelicalRampNode': HelicalRampNode,
  'StairHandrailNode': StairHandrailNode,
  'StairBalustradeNode': StairBalustradeNode,
  'StairNosingNode': StairNosingNode,
  'StairStringerNode': StairStringerNode,
  'EscapeStairNode': EscapeStairNode,
  'MonumentalStairNode': MonumentalStairNode,
  'FloatingStairNode': FloatingStairNode,
  'LoadingDockNode': LoadingDockNode,
  'CurbRampNode': CurbRampNode,
  'AlternatingTreadStairNode': AlternatingTreadStairNode,
  'VehicleRampNode': VehicleRampNode,
  'SingleDoorNode': SingleDoorNode,
  'DoubleDoorNode': DoubleDoorNode,
  'SlidingDoorNode': SlidingDoorNode,
  'RevolvingDoorNode': RevolvingDoorNode,
  'FoldingDoorNode': FoldingDoorNode,
  'RollupDoorNode': RollupDoorNode,
  'CasementWindowNode': CasementWindowNode,
  'SlidingWindowNode': SlidingWindowNode,
  'DoubleHungWindowNode': DoubleHungWindowNode,
  'AwningWindowNode': AwningWindowNode,
  'BayWindowNode': BayWindowNode,
  'BowWindowNode': BowWindowNode,
  'ClerestroyWindowNode': ClerestroyWindowNode,
  'FireDoorNode': FireDoorNode,
  'SecurityDoorNode': SecurityDoorNode,
  'StainedGlassWindowNode': StainedGlassWindowNode,
  'OverheadDoorNode': OverheadDoorNode,
  'JalousieWindowNode': JalousieWindowNode,
  'DutchDoorNode': DutchDoorNode,
  'GothicWindowNode': GothicWindowNode,
  'SpurGearNode': SpurGearNode,
  'HelicalGearNode': HelicalGearNode,
  'BevelGearNode': BevelGearNode,
  'WormGearNode': WormGearNode,
  'WormShaftNode': WormShaftNode,
  'RackGearNode': RackGearNode,
  'InternalGearNode': InternalGearNode,
  'PlanetaryGearSetNode': PlanetaryGearSetNode,
  'TimingPulleyNode': TimingPulleyNode,
  'ChainSprocketNode': ChainSprocketNode,
  'CVTDiscNode': CVTDiscNode,
  'DifferentialGearNode': DifferentialGearNode,
  'BallBearingNode': BallBearingNode,
  'RollerBearingNode': RollerBearingNode,
  'ThrustBearingNode': ThrustBearingNode,
  'NeedleBearingNode': NeedleBearingNode,
  'LinearBearingNode': LinearBearingNode,
  'PillowBlockNode': PillowBlockNode,
  'FlangeBearingNode': FlangeBearingNode,
  'BronzeBushingNode': BronzeBushingNode,
  'SphericalBearingNode': SphericalBearingNode,
  'AirBearingNode': AirBearingNode,
  'HexBoltNode': HexBoltNode,
  'SocketHeadCapScrewNode': SocketHeadCapScrewNode,
  'HexNutNode': HexNutNode,
  'WasherNode': WasherNode,
  'ThreadInsertNode': ThreadInsertNode,
  'RivetNode': RivetNode,
  'ClampingCollarNode': ClampingCollarNode,
  'DowelNode': DowelNode,
  'RetainingRingNode': RetainingRingNode,
  'KeywayJointNode': KeywayJointNode,
  'CompressionSpringNode': CompressionSpringNode,
  'ExtensionSpringNode': ExtensionSpringNode,
  'TorsionSpringNode': TorsionSpringNode,
  'LeafSpringNode': LeafSpringNode,
  'GasSpringNode': GasSpringNode,
  'CamProfileNode': CamProfileNode,
  'LinkageMechanismNode': LinkageMechanismNode,
  'RatchetMechanismNode': RatchetMechanismNode,
  'ClutchMechanismNode': ClutchMechanismNode,
  'UniversalJointNode': UniversalJointNode,
  'SteppedShaftNode': SteppedShaftNode,
  'SplinedShaftNode': SplinedShaftNode,
  'FlexibleShaftNode': FlexibleShaftNode,
  'HollowShaftNode': HollowShaftNode,
  'RigidCouplingNode': RigidCouplingNode,
  'FlexibleCouplingNode': FlexibleCouplingNode,
  'OldhamCouplingNode': OldhamCouplingNode,
  'FluidCouplingNode': FluidCouplingNode,
  'PulleySystemNode': PulleySystemNode,
  'ChainDriveNode': ChainDriveNode,
  'CurvatureCombNode': CurvatureCombNode,
  'CurveLengthNode': CurveLengthNode,
  'CurveSmoothnessAnalysisNode': CurveSmoothnessAnalysisNode,
  'CurveInflectionPointsNode': CurveInflectionPointsNode,
  'CurveTorsionNode': CurveTorsionNode,
  'CurveDerivativesNode': CurveDerivativesNode,
  'CurveParameterNode': CurveParameterNode,
  'CurveEndpointsNode': CurveEndpointsNode,
  'CurveClosestPointNode': CurveClosestPointNode,
  'CurveExtremePointsNode': CurveExtremePointsNode,
  'CurveAreaMomentsNode': CurveAreaMomentsNode,
  'CurveConvexHullNode': CurveConvexHullNode,
  'CurveBoundingBoxNode': CurveBoundingBoxNode,
  'CurveSpiralNode': CurveSpiralNode,
  'SurfaceCurvatureNode': SurfaceCurvatureNode,
  'SurfaceNormalsNode': SurfaceNormalsNode,
  'SurfaceAreaNode': SurfaceAreaNode,
  'SurfaceIsoCurvesNode': SurfaceIsoCurvesNode,
  'SurfaceParametrizationNode': SurfaceParametrizationNode,
  'SurfaceDerivativesNode': SurfaceDerivativesNode,
  'SurfaceClosestPointNode': SurfaceClosestPointNode,
  'SurfaceBoundaryNode': SurfaceBoundaryNode,
  'SurfaceContinuityNode': SurfaceContinuityNode,
  'SurfaceFlatnessNode': SurfaceFlatnessNode,
  'SurfaceRoughnessNode': SurfaceRoughnessNode,
  'CurveCurveIntersectionNode': CurveCurveIntersectionNode,
  'CurveSurfaceIntersectionNode': CurveSurfaceIntersectionNode,
  'SurfaceSurfaceIntersectionNode': SurfaceSurfaceIntersectionNode,
  'PlaneIntersectionNode': PlaneIntersectionNode,
  'RayIntersectionNode': RayIntersectionNode,
  'MinimumDistanceNode': MinimumDistanceNode,
  'ProximityAnalysisNode': ProximityAnalysisNode,
  'ClearanceCheckNode': ClearanceCheckNode,
  'VisibilityAnalysisNode': VisibilityAnalysisNode,
  'ShadowAnalysisNode': ShadowAnalysisNode,
  'VolumeCalculationNode': VolumeCalculationNode,
  'AngleMeasurementNode': AngleMeasurementNode,
  'DistanceMeasurementNode': DistanceMeasurementNode,
  'GeometryValidationNode': GeometryValidationNode,
  'MeshQualityNode': MeshQualityNode,
  'ToleranceAnalysisNode': ToleranceAnalysisNode,
  'STEPImportNode': STEPImportNode,
  'STEPExportNode': STEPExportNode,
  'IGESImportNode': IGESImportNode,
  'IGESExportNode': IGESExportNode,
  'STLImportNode': STLImportNode,
  'STLExportNode': STLExportNode,
  'OBJImportNode': OBJImportNode,
  'OBJExportNode': OBJExportNode,
  'PLYImportNode': PLYImportNode,
  'PLYExportNode': PLYExportNode,
  'ThreeMFImportNode': ThreeMFImportNode,
  'ThreeMFExportNode': ThreeMFExportNode,
  'DXFImportNode': DXFImportNode,
  'DXFExportNode': DXFExportNode,
  'SVGImportNode': SVGImportNode,
  'SVGExportNode': SVGExportNode,
  'SQLQueryNode': SQLQueryNode,
  'SQLInsertNode': SQLInsertNode,
  'HTTPRequestNode': HTTPRequestNode,
  'JSONParserNode': JSONParserNode,
  'JSONGeneratorNode': JSONGeneratorNode,
  'S3UploadNode': S3UploadNode,
  'S3DownloadNode': S3DownloadNode,
  'EmailSenderNode': EmailSenderNode,
  'SlackNotificationNode': SlackNotificationNode,
  'CSVReaderNode': CSVReaderNode,
  'CSVWriterNode': CSVWriterNode,
  'ExcelReaderNode': ExcelReaderNode,
  'ExcelWriterNode': ExcelWriterNode,
  'GrasshopperExportNode': GrasshopperExportNode,
  'WebSocketClientNode': WebSocketClientNode,
  'MQTTPublisherNode': MQTTPublisherNode,
  'MQTTSubscriberNode': MQTTSubscriberNode,
  'SerialPortNode': SerialPortNode,
  'TCPClientNode': TCPClientNode,
  'GeneticOptimizerNode': GeneticOptimizerNode,
  'ParticleSwarmOptimizerNode': ParticleSwarmOptimizerNode,
  'SimulatedAnnealingNode': SimulatedAnnealingNode,
  'GradientDescentNode': GradientDescentNode,
  'TopologyOptimizerNode': TopologyOptimizerNode,
  'LinearRegressionNode': LinearRegressionNode,
  'DecisionTreeNode': DecisionTreeNode,
  'NeuralNetworkNode': NeuralNetworkNode,
  'SupportVectorMachineNode': SupportVectorMachineNode,
  'ConvexHull3DNode': ConvexHull3DNode,
  'VisibilityGraphNode': VisibilityGraphNode,
  'MedialAxisNode': MedialAxisNode,
  'MarchingCubesNode': MarchingCubesNode,
  'SpacePartitioningNode': SpacePartitioningNode,
  'VoxelGridNode': VoxelGridNode,
  'PointCloudProcessingNode': PointCloudProcessingNode,
  'SurfaceReconstructionNode': SurfaceReconstructionNode,
  'GeometrySimplificationNode': GeometrySimplificationNode,
  'GeometryMatchingNode': GeometryMatchingNode,
  'ShapeDescriptorNode': ShapeDescriptorNode,
  GeometricReactionDiffusionNode,
  AlgorithmicSubdivisionSurfaceNode,
  CNCCollisionDetectionNode,
  AnalysisSurfaceDeviationNode,
  ProximityCollisionDetectionNode,
  AlgorithmicKMeansClusteringNode,
  AlgorithmicShortestPathNode,
  MachineLearningKMeansClusteringNode,
  GeometryAlphaShapeNode,
  GeometryMinimumSpanningTreeNode,
  GeometryShortestPathNode,
  GeometryDistanceFieldNode};
