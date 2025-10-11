/**
 * Auto-generated Node Index
 * Generated from templates on 2025-10-11T07:44:16.056Z
 */

import { SimpleHoleNode } from './features/holes/simple-hole.node';
import { CounterboreHoleNode } from './features/holes/counterbore-hole.node';
import { CountersinkHoleNode } from './features/holes/countersink-hole.node';
import { ThreadedHoleNode } from './features/holes/threaded-hole.node';
import { RectangularPocketNode } from './features/pockets/rectangular-pocket.node';
import { CircularPocketNode } from './features/pockets/circular-pocket.node';
import { LinearRibNode } from './features/structural/linear-rib.node';
import { MountingBossNode } from './features/structural/mounting-boss.node';
import { LinearPatternNode } from './transform/patterns/linear-pattern.node';
import { CircularPatternNode } from './transform/patterns/circular-pattern.node';
import { RectangularPatternNode } from './transform/patterns/rectangular-pattern.node';
import { MoveNode } from './transform/move.node';
import { RotateNode } from './transform/rotate.node';
import { ScaleNode } from './transform/scale.node';
import { MirrorNode } from './transform/mirror.node';
import { LinearArrayNode } from './transform/linear-array.node';
import { PolarArrayNode } from './transform/polar-array.node';
import { PathArrayNode } from './transform/path-array.node';
import { GridArrayNode } from './transform/grid-array.node';
import { AlignNode } from './transform/align.node';
import { OrientNode } from './transform/orient.node';
import { ProjectToPlaneNode } from './transform/project-to-plane.node';
import { WrapNode } from './transform/wrap.node';
import { DeformNode } from './transform/deform.node';
import { BoundingBoxAlignNode } from './transform/bounding-box-align.node';
import { MatrixTransformNode } from './transform/matrix-transform.node';
import { PrismNode } from './solid/parametric/prism.node';
import { WedgeNode } from './solid/parametric/wedge.node';
import { PyramidNode } from './solid/parametric/pyramid.node';
import { BezierSurfaceNode } from './solid/surface/bezier-surface.node';
import { BSplineSurfaceNode } from './solid/surface/bspline-surface.node';
import { RuledSurfaceNode } from './solid/surface/ruled-surface.node';
import { HelixNode } from './solid/helical/helix.node';
import { SpringNode } from './solid/helical/spring.node';
import { ThreadNode } from './solid/helical/thread.node';
import { BoxNode } from './solid/primitives/box.node';
import { SphereNode } from './solid/primitives/sphere.node';
import { CylinderNode } from './solid/primitives/cylinder.node';
import { ConeNode } from './solid/primitives/cone.node';
import { TorusNode } from './solid/primitives/torus.node';
import { EllipsoidNode } from './solid/primitives/ellipsoid.node';
import { CapsuleNode } from './solid/primitives/capsule.node';
import { RoundedBoxNode } from './solid/primitives/rounded-box.node';
import { PipeNode } from './solid/primitives/pipe.node';
import { PolyhedronNode } from './solid/primitives/polyhedron.node';
import { EllipseNode } from './sketch/curves/ellipse.node';
import { ParabolaNode } from './sketch/curves/parabola.node';
import { HyperbolaNode } from './sketch/curves/hyperbola.node';
import { SpiralNode } from './sketch/curves/spiral.node';
import { PolygonNode } from './sketch/patterns/polygon.node';
import { StarNode } from './sketch/patterns/star.node';
import { GearNode } from './sketch/patterns/gear.node';
import { LineNode } from './sketch/basic/line.node';
import { ArcNode } from './sketch/basic/arc.node';
import { CircleNode } from './sketch/basic/circle.node';
import { RectangleNode } from './sketch/basic/rectangle.node';
import { PolylineNode } from './sketch/basic/polyline.node';
import { SplineNode } from './sketch/curves/spline.node';
import { BezierCurveNode } from './sketch/curves/bezier-curve.node';
import { BSplineCurveNode } from './sketch/curves/bspline-curve.node';
import { PointNode } from './sketch/basic/point.node';
import { SlotNode } from './sketch/basic/slot.node';
import { TextNode } from './sketch/basic/text.node';
import { OffsetNode } from './sketch/curves/offset.node';
import { Fillet2DNode } from './sketch/curves/fillet2-d.node';
import { Chamfer2DNode } from './sketch/curves/chamfer2-d.node';
import { TrimNode } from './sketch/curves/trim.node';
import { UnionNode } from './boolean/union.node';
import { DifferenceNode } from './boolean/difference.node';
import { IntersectionNode } from './boolean/intersection.node';
import { XORNode } from './boolean/xor.node';
import { SplitNode } from './boolean/split.node';
import { FragmentNode } from './boolean/fragment.node';
import { CommonEdgesNode } from './boolean/common-edges.node';
import { ImprintNode } from './boolean/imprint.node';
import { GlueNode } from './boolean/glue.node';
import { CompoundNode } from './boolean/compound.node';
import { CoincidentNode } from './assembly/constraints/coincident.node';
import { ParallelNode } from './assembly/constraints/parallel.node';
import { PerpendicularNode } from './assembly/constraints/perpendicular.node';
import { TangentNode } from './assembly/constraints/tangent.node';
import { ConcentricNode } from './assembly/constraints/concentric.node';
import { DistanceNode } from './assembly/constraints/distance.node';
import { AngleNode } from './assembly/constraints/angle.node';
import { HorizontalNode } from './assembly/constraints/horizontal.node';
import { VerticalNode } from './assembly/constraints/vertical.node';
import { FixedNode } from './assembly/constraints/fixed.node';
import { FaceToFaceNode } from './assembly/mates/face-to-face.node';
import { EdgeToEdgeNode } from './assembly/mates/edge-to-edge.node';
import { PointToPointNode } from './assembly/mates/point-to-point.node';
import { AxisToAxisNode } from './assembly/mates/axis-to-axis.node';
import { PlaneToPlaneNode } from './assembly/mates/plane-to-plane.node';
import { FastenedNode } from './assembly/mates/fastened.node';
import { GearNode } from './assembly/mates/gear.node';
import { CamNode } from './assembly/mates/cam.node';
import { SlotNode } from './assembly/mates/slot.node';
import { PathNode } from './assembly/mates/path.node';
import { RevoluteNode } from './assembly/joints/revolute.node';
import { PrismaticNode } from './assembly/joints/prismatic.node';
import { CylindricalNode } from './assembly/joints/cylindrical.node';
import { SphericalNode } from './assembly/joints/spherical.node';
import { PlanarNode } from './assembly/joints/planar.node';
import { UniversalNode } from './assembly/joints/universal.node';
import { FixedNode } from './assembly/joints/fixed.node';
import { ScrewNode } from './assembly/joints/screw.node';
import { BeltNode } from './assembly/joints/belt.node';
import { RackPinionNode } from './assembly/joints/rack-pinion.node';
import { ComponentPatternNode } from './assembly/patterns/component-pattern.node';
import { FlexibleSubAssemblyNode } from './assembly/patterns/flexible-sub-assembly.node';
import { ConfigurationNode } from './assembly/patterns/configuration.node';
import { ExplodedViewNode } from './assembly/patterns/exploded-view.node';
import { BillOfMaterialsNode } from './assembly/patterns/bill-of-materials.node';
import { InterferenceCheckNode } from './assembly/patterns/interference-check.node';
import { MotionStudyNode } from './assembly/patterns/motion-study.node';
import { EnvelopeNode } from './assembly/patterns/envelope.node';
import { SmartFastenersNode } from './assembly/patterns/smart-fasteners.node';
import { ContactSetNode } from './assembly/patterns/contact-set.node';
import { EdgeFlangeNode } from './sheetmetal/flanges/edge-flange.node';
import { ContourFlangeNode } from './sheetmetal/flanges/contour-flange.node';
import { MiterFlangeNode } from './sheetmetal/flanges/miter-flange.node';
import { SketchedBendNode } from './sheetmetal/bends/sketched-bend.node';
import { HemNode } from './sheetmetal/bends/hem.node';
import { JogNode } from './sheetmetal/bends/jog.node';
import { CornerReliefNode } from './sheetmetal/corners/corner-relief.node';
import { BendReliefNode } from './sheetmetal/corners/bend-relief.node';
import { ClosedCornerNode } from './sheetmetal/corners/closed-corner.node';
import { TabNode } from './sheetmetal/features/tab.node';
import { SlotNode } from './sheetmetal/features/slot.node';
import { LouverNode } from './sheetmetal/features/louver.node';
import { LanceNode } from './sheetmetal/features/lance.node';
import { BeadNode } from './sheetmetal/features/bead.node';
import { UnfoldNode } from './sheetmetal/unfold/unfold.node';
import { FoldNode } from './sheetmetal/unfold/fold.node';
import { ExportDXFNode } from './sheetmetal/unfold/export-dxf.node';
import { SheetMetalStyleNode } from './sheetmetal/properties/sheet-metal-style.node';
import { BendTableNode } from './sheetmetal/properties/bend-table.node';
import { CostEstimateNode } from './sheetmetal/properties/cost-estimate.node';
import { SweepNode } from './advanced/sweep/sweep.node';
import { HelicalSweepNode } from './advanced/sweep/helical-sweep.node';
import { LoftNode } from './advanced/loft/loft.node';
import { BlendSurfaceNode } from './advanced/loft/blend-surface.node';
import { BoundaryNode } from './advanced/boundary/boundary.node';
import { ShellNode } from './advanced/shell/shell.node';
import { VariableShellNode } from './advanced/shell/variable-shell.node';
import { ThickenNode } from './advanced/thickness/thicken.node';
import { OffsetSurfaceNode } from './advanced/thickness/offset-surface.node';
import { DraftNode } from './advanced/draft/draft.node';
import { PartingLineDraftNode } from './advanced/draft/parting-line-draft.node';
import { StepDraftNode } from './advanced/draft/step-draft.node';
import { TrimSurfaceNode } from './advanced/surface/trim-surface.node';
import { ExtendSurfaceNode } from './advanced/surface/extend-surface.node';
import { UntrimSurfaceNode } from './advanced/surface/untrim-surface.node';
import { KnitSurfacesNode } from './advanced/surface/knit-surfaces.node';
import { PatchSurfaceNode } from './advanced/surface/patch-surface.node';
import { WrapNode } from './advanced/features/wrap.node';
import { DomeNode } from './advanced/features/dome.node';
import { FlexNode } from './advanced/features/flex.node';
import { IndentNode } from './advanced/features/indent.node';
import { DeformNode } from './advanced/features/deform.node';
import { HealShapeNode } from './advanced/healing/heal-shape.node';
import { RemoveFeaturesNode } from './advanced/healing/remove-features.node';
import { DeleteFaceNode } from './advanced/healing/delete-face.node';
import { SimplifyShapeNode } from './advanced/healing/simplify-shape.node';
import { CheckGeometryNode } from './advanced/healing/check-geometry.node';
import { NurbsSurfaceNode } from './surface/nurbs/nurbs-surface.node';
import { NetworkSurfaceNode } from './surface/nurbs/network-surface.node';
import { SurfaceFromPointsNode } from './surface/nurbs/surface-from-points.node';
import { CoonsPatchNode } from './surface/nurbs/coons-patch.node';
import { GordonSurfaceNode } from './surface/nurbs/gordon-surface.node';
import { NurbsCurveNode } from './surface/curves/nurbs-curve.node';
import { InterpolateCurveNode } from './surface/curves/interpolate-curve.node';
import { ApproximateCurveNode } from './surface/curves/approximate-curve.node';
import { BlendCurveNode } from './surface/curves/blend-curve.node';
import { CompositeCurveNode } from './surface/curves/composite-curve.node';
import { CurvatureAnalysisNode } from './surface/analysis/curvature-analysis.node';
import { ZebraAnalysisNode } from './surface/analysis/zebra-analysis.node';
import { DraftAnalysisNode } from './surface/analysis/draft-analysis.node';
import { ContinuityCheckNode } from './surface/analysis/continuity-check.node';
import { SurfaceDeviationNode } from './surface/analysis/surface-deviation.node';
import { ReflectionLinesNode } from './surface/analysis/reflection-lines.node';
import { IsocurveExtractNode } from './surface/analysis/isocurve-extract.node';
import { SectionCurvesNode } from './surface/analysis/section-curves.node';
import { ProjectCurveNode } from './surface/curve-ops/project-curve.node';
import { IntersectCurvesNode } from './surface/curve-ops/intersect-curves.node';
import { CurveOnSurfaceNode } from './surface/curve-ops/curve-on-surface.node';
import { GeodesicCurveNode } from './surface/curve-ops/geodesic-curve.node';
import { IsoparametricCurveNode } from './surface/curve-ops/isoparametric-curve.node';
import { TessellateNode } from './mesh/tessellation/tessellate.node';
import { AdaptiveTessellationNode } from './mesh/tessellation/adaptive-tessellation.node';
import { RemeshUniformNode } from './mesh/tessellation/remesh-uniform.node';
import { QuadMeshNode } from './mesh/tessellation/quad-mesh.node';
import { VoxelMeshNode } from './mesh/tessellation/voxel-mesh.node';
import { RepairMeshNode } from './mesh/repair/repair-mesh.node';
import { SimplifyMeshNode } from './mesh/repair/simplify-mesh.node';
import { FillHolesNode } from './mesh/repair/fill-holes.node';
import { SmoothMeshNode } from './mesh/repair/smooth-mesh.node';
import { DecimateMeshNode } from './mesh/repair/decimate-mesh.node';
import { SubdivideMeshNode } from './mesh/repair/subdivide-mesh.node';
import { MeshBooleanNode } from './mesh/repair/mesh-boolean.node';
import { MeshOffsetNode } from './mesh/repair/mesh-offset.node';
import { ImportSTLNode } from './mesh/files/import-stl.node';
import { ExportSTLNode } from './mesh/files/export-stl.node';
import { ImportOBJNode } from './mesh/files/import-obj.node';
import { ExportOBJNode } from './mesh/files/export-obj.node';
import { ImportPLYNode } from './mesh/files/import-ply.node';
import { Export3MFNode } from './mesh/files/export3-mf.node';
import { MeshToShapeNode } from './mesh/files/mesh-to-shape.node';
import { ImportSTEPNode } from './io/cad/import-step.node';
import { ExportSTEPNode } from './io/cad/export-step.node';
import { ImportIGESNode } from './io/cad/import-iges.node';
import { ExportIGESNode } from './io/cad/export-iges.node';
import { ImportBREPNode } from './io/cad/import-brep.node';
import { ExportBREPNode } from './io/cad/export-brep.node';
import { ImportParasolidNode } from './io/cad/import-parasolid.node';
import { ImportACISNode } from './io/cad/import-acis.node';
import { ImportDXFNode } from './io/drawing/import-dxf.node';
import { ExportDXFNode } from './io/drawing/export-dxf.node';
import { ExportSVGNode } from './io/drawing/export-svg.node';
import { ImportGLTFNode } from './io/exchange/import-gltf.node';
import { ExportGLTFNode } from './io/exchange/export-gltf.node';
import { ImportJSONNode } from './io/exchange/import-json.node';
import { ExportJSONNode } from './io/exchange/export-json.node';
import { Text3DNode } from './specialized/text/text3-d.node';
import { EngraveNode } from './specialized/text/engrave.node';
import { EmbossNode } from './specialized/text/emboss.node';
import { SerialNumberNode } from './specialized/text/serial-number.node';
import { BarcodeNode } from './specialized/text/barcode.node';
import { LatticeStructureNode } from './specialized/lattice/lattice-structure.node';
import { TPMSNode } from './specialized/lattice/tpms.node';
import { VoronoiLatticeNode } from './specialized/lattice/voronoi-lattice.node';
import { GradedLatticeNode } from './specialized/lattice/graded-lattice.node';
import { ConformLatticeNode } from './specialized/lattice/conform-lattice.node';
import { HoneycombStructureNode } from './specialized/lattice/honeycomb-structure.node';
import { TopologyOptimizeNode } from './specialized/optimization/topology-optimize.node';
import { ShapeOptimizeNode } from './specialized/optimization/shape-optimize.node';
import { GenerativeDesignNode } from './specialized/optimization/generative-design.node';
import { LightweightStructureNode } from './specialized/optimization/lightweight-structure.node';
import { StressReliefNode } from './specialized/optimization/stress-relief.node';
import { PackingOptimizeNode } from './specialized/optimization/packing-optimize.node';
import { MetaBallsNode } from './specialized/organic/meta-balls.node';
import { SubdivisionSurfaceNode } from './specialized/organic/subdivision-surface.node';
import { FractalGeometryNode } from './specialized/organic/fractal-geometry.node';
import { ReactionDiffusionNode } from './specialized/organic/reaction-diffusion.node';
import { BiomimeticStructureNode } from './specialized/organic/biomimetic-structure.node';
import { MeshForFEANode } from './simulation/fea/mesh-for-fea.node';
import { ApplyLoadsNode } from './simulation/fea/apply-loads.node';
import { ApplyConstraintsNode } from './simulation/fea/apply-constraints.node';
import { MaterialAssignNode } from './simulation/fea/material-assign.node';
import { ExportFEANode } from './simulation/fea/export-fea.node';
import { FluidDomainNode } from './simulation/cfd/fluid-domain.node';
import { BoundaryLayersNode } from './simulation/cfd/boundary-layers.node';
import { InletOutletNode } from './simulation/cfd/inlet-outlet.node';
import { FluidPropertiesNode } from './simulation/cfd/fluid-properties.node';
import { ExportCFDNode } from './simulation/cfd/export-cfd.node';
import { JointDefinitionNode } from './simulation/kinematics/joint-definition.node';
import { MotionDriverNode } from './simulation/kinematics/motion-driver.node';
import { CollisionDetectionNode } from './simulation/kinematics/collision-detection.node';
import { ForwardKinematicsNode } from './simulation/kinematics/forward-kinematics.node';
import { InverseKinematicsNode } from './simulation/kinematics/inverse-kinematics.node';
import { AddNode } from './math/operators/add.node';
import { SubtractNode } from './math/operators/subtract.node';
import { MultiplyNode } from './math/operators/multiply.node';
import { DivideNode } from './math/operators/divide.node';
import { PowerNode } from './math/operators/power.node';
import { ModuloNode } from './math/operators/modulo.node';
import { AbsoluteNode } from './math/operators/absolute.node';
import { NegateNode } from './math/operators/negate.node';
import { SquareRootNode } from './math/operators/square-root.node';
import { FactorialNode } from './math/operators/factorial.node';
import { SineNode } from './math/trigonometry/sine.node';
import { CosineNode } from './math/trigonometry/cosine.node';
import { TangentNode } from './math/trigonometry/tangent.node';
import { ArcSineNode } from './math/trigonometry/arc-sine.node';
import { ArcCosineNode } from './math/trigonometry/arc-cosine.node';
import { ArcTangentNode } from './math/trigonometry/arc-tangent.node';
import { ArcTangent2Node } from './math/trigonometry/arc-tangent2.node';
import { HyperbolicSineNode } from './math/trigonometry/hyperbolic-sine.node';
import { HyperbolicCosineNode } from './math/trigonometry/hyperbolic-cosine.node';
import { HyperbolicTangentNode } from './math/trigonometry/hyperbolic-tangent.node';
import { NaturalLogNode } from './math/logarithmic/natural-log.node';
import { Log10Node } from './math/logarithmic/log10.node';
import { LogBaseNode } from './math/logarithmic/log-base.node';
import { ExponentialNode } from './math/logarithmic/exponential.node';
import { Exp10Node } from './math/logarithmic/exp10.node';
import { RoundNode } from './math/rounding/round.node';
import { FloorNode } from './math/rounding/floor.node';
import { CeilingNode } from './math/rounding/ceiling.node';
import { TruncateNode } from './math/rounding/truncate.node';
import { RoundToDecimalNode } from './math/rounding/round-to-decimal.node';
import { MinNode } from './math/comparison/min.node';
import { MaxNode } from './math/comparison/max.node';
import { ClampNode } from './math/comparison/clamp.node';
import { SignNode } from './math/comparison/sign.node';
import { IsEqualNode } from './math/comparison/is-equal.node';
import { AverageNode } from './math/statistics/average.node';
import { MedianNode } from './math/statistics/median.node';
import { ModeNode } from './math/statistics/mode.node';
import { StandardDeviationNode } from './math/statistics/standard-deviation.node';
import { VarianceNode } from './math/statistics/variance.node';
import { SumNode } from './math/statistics/sum.node';
import { ProductNode } from './math/statistics/product.node';
import { RangeNode } from './math/statistics/range.node';
import { PercentileNode } from './math/statistics/percentile.node';
import { CorrelationNode } from './math/statistics/correlation.node';
import { RandomNode } from './math/random/random.node';
import { RandomRangeNode } from './math/random/random-range.node';
import { RandomIntegerNode } from './math/random/random-integer.node';
import { RandomNormalNode } from './math/random/random-normal.node';
import { RandomPoissonNode } from './math/random/random-poisson.node';
import { RandomExponentialNode } from './math/random/random-exponential.node';
import { RandomChoiceNode } from './math/random/random-choice.node';
import { ShuffleNode } from './math/random/shuffle.node';
import { PerlinNoiseNode } from './math/random/perlin-noise.node';
import { SimplexNoiseNode } from './math/random/simplex-noise.node';
import { LerpNode } from './math/interpolation/lerp.node';
import { InverseLerpNode } from './math/interpolation/inverse-lerp.node';
import { RemapNode } from './math/interpolation/remap.node';
import { SmoothStepNode } from './math/interpolation/smooth-step.node';
import { SmootherStepNode } from './math/interpolation/smoother-step.node';
import { CubicInterpNode } from './math/interpolation/cubic-interp.node';
import { HermiteInterpNode } from './math/interpolation/hermite-interp.node';
import { BezierInterpNode } from './math/interpolation/bezier-interp.node';
import { EaseInNode } from './math/interpolation/ease-in.node';
import { EaseOutNode } from './math/interpolation/ease-out.node';
import { EaseInOutNode } from './math/interpolation/ease-in-out.node';
import { SpringInterpNode } from './math/interpolation/spring-interp.node';
import { ComplexNumberNode } from './math/complex/complex-number.node';
import { ComplexAddNode } from './math/complex/complex-add.node';
import { ComplexMultiplyNode } from './math/complex/complex-multiply.node';
import { ComplexConjugateNode } from './math/complex/complex-conjugate.node';
import { ComplexMagnitudeNode } from './math/complex/complex-magnitude.node';
import { ComplexPhaseNode } from './math/complex/complex-phase.node';
import { MatrixMultiplyNode } from './math/matrix/matrix-multiply.node';
import { MatrixInverseNode } from './math/matrix/matrix-inverse.node';
import { MatrixDeterminantNode } from './math/matrix/matrix-determinant.node';
import { MatrixTransposeNode } from './math/matrix/matrix-transpose.node';
import { ListLengthNode } from './data/list/list-length.node';
import { ListItemNode } from './data/list/list-item.node';
import { ListSliceNode } from './data/list/list-slice.node';
import { ListReverseNode } from './data/list/list-reverse.node';
import { ListSortNode } from './data/list/list-sort.node';
import { ListShuffleNode } from './data/list/list-shuffle.node';
import { ListShiftNode } from './data/list/list-shift.node';
import { ListInsertNode } from './data/list/list-insert.node';
import { ListRemoveNode } from './data/list/list-remove.node';
import { ListReplaceNode } from './data/list/list-replace.node';
import { ListAppendNode } from './data/list/list-append.node';
import { ListPrependNode } from './data/list/list-prepend.node';
import { ListJoinNode } from './data/list/list-join.node';
import { ListSplitNode } from './data/list/list-split.node';
import { ListPartitionNode } from './data/list/list-partition.node';
import { ListFlattenNode } from './data/list/list-flatten.node';
import { ListUniqueNode } from './data/list/list-unique.node';
import { ListContainsNode } from './data/list/list-contains.node';
import { ListFindNode } from './data/list/list-find.node';
import { ListFilterNode } from './data/list/list-filter.node';
import { SetUnionNode } from './data/set/set-union.node';
import { SetIntersectionNode } from './data/set/set-intersection.node';
import { SetDifferenceNode } from './data/set/set-difference.node';
import { SetSymmetricDifferenceNode } from './data/set/set-symmetric-difference.node';
import { SetSubsetNode } from './data/set/set-subset.node';
import { SetCartesianProductNode } from './data/set/set-cartesian-product.node';
import { SetPowerSetNode } from './data/set/set-power-set.node';
import { SetCombinationsNode } from './data/set/set-combinations.node';
import { SetPermutationsNode } from './data/set/set-permutations.node';
import { SetPartitionsNode } from './data/set/set-partitions.node';
import { TreeBranchNode } from './data/tree/tree-branch.node';
import { TreePathsNode } from './data/tree/tree-paths.node';
import { TreeGraftNode } from './data/tree/tree-graft.node';
import { TreeFlattenNode } from './data/tree/tree-flatten.node';
import { TreeSimplifyNode } from './data/tree/tree-simplify.node';
import { TreePruneNode } from './data/tree/tree-prune.node';
import { TreeMergeNode } from './data/tree/tree-merge.node';
import { TreeExplodeNode } from './data/tree/tree-explode.node';
import { TreeShiftNode } from './data/tree/tree-shift.node';
import { TreeStatisticsNode } from './data/tree/tree-statistics.node';
import { StringConcatNode } from './data/string/string-concat.node';
import { StringSplitNode } from './data/string/string-split.node';
import { StringReplaceNode } from './data/string/string-replace.node';
import { StringFormatNode } from './data/string/string-format.node';
import { StringCaseNode } from './data/string/string-case.node';
import { StringTrimNode } from './data/string/string-trim.node';
import { StringLengthNode } from './data/string/string-length.node';
import { StringSubstringNode } from './data/string/string-substring.node';
import { StringContainsNode } from './data/string/string-contains.node';
import { StringMatchNode } from './data/string/string-match.node';
import { ToStringNode } from './data/convert/to-string.node';
import { ToNumberNode } from './data/convert/to-number.node';
import { ToBooleanNode } from './data/convert/to-boolean.node';
import { ToJSONNode } from './data/convert/to-json.node';
import { FromJSONNode } from './data/convert/from-json.node';
import { ToCSVNode } from './data/convert/to-csv.node';
import { FromCSVNode } from './data/convert/from-csv.node';
import { ToBase64Node } from './data/convert/to-base64.node';
import { FromBase64Node } from './data/convert/from-base64.node';
import { TypeOfNode } from './data/convert/type-of.node';
import { LinearFieldNode } from './field/generate/linear-field.node';
import { RadialFieldNode } from './field/generate/radial-field.node';
import { SphericalFieldNode } from './field/generate/spherical-field.node';
import { CylindricalFieldNode } from './field/generate/cylindrical-field.node';
import { NoiseFieldNode } from './field/generate/noise-field.node';
import { SineFieldNode } from './field/generate/sine-field.node';
import { VectorFieldNode } from './field/generate/vector-field.node';
import { ImageFieldNode } from './field/generate/image-field.node';
import { DistanceFieldNode } from './field/generate/distance-field.node';
import { ChargeFieldNode } from './field/generate/charge-field.node';
import { PointAttractorNode } from './field/attractor/point-attractor.node';
import { CurveAttractorNode } from './field/attractor/curve-attractor.node';
import { SurfaceAttractorNode } from './field/attractor/surface-attractor.node';
import { MeshAttractorNode } from './field/attractor/mesh-attractor.node';
import { SpinAttractorNode } from './field/attractor/spin-attractor.node';
import { DirectionalAttractorNode } from './field/attractor/directional-attractor.node';
import { TwistAttractorNode } from './field/attractor/twist-attractor.node';
import { VortexAttractorNode } from './field/attractor/vortex-attractor.node';
import { GravityAttractorNode } from './field/attractor/gravity-attractor.node';
import { FlowAttractorNode } from './field/attractor/flow-attractor.node';
import { FieldAddNode } from './field/operations/field-add.node';
import { FieldSubtractNode } from './field/operations/field-subtract.node';
import { FieldMultiplyNode } from './field/operations/field-multiply.node';
import { FieldDivideNode } from './field/operations/field-divide.node';
import { FieldMinNode } from './field/operations/field-min.node';
import { FieldMaxNode } from './field/operations/field-max.node';
import { FieldBlendNode } from './field/operations/field-blend.node';
import { FieldRemapNode } from './field/operations/field-remap.node';
import { FieldClampNode } from './field/operations/field-clamp.node';
import { FieldInvertNode } from './field/operations/field-invert.node';
import { FieldGradientNode } from './field/operations/field-gradient.node';
import { FieldDivergenceNode } from './field/operations/field-divergence.node';
import { FieldCurlNode } from './field/operations/field-curl.node';
import { FieldLaplacianNode } from './field/operations/field-laplacian.node';
import { FieldSmoothNode } from './field/operations/field-smooth.node';
import { SampleFieldNode } from './field/sample/sample-field.node';
import { FieldLineNode } from './field/sample/field-line.node';
import { IsoContourNode } from './field/sample/iso-contour.node';
import { IsoSurfaceNode } from './field/sample/iso-surface.node';
import { FieldGridNode } from './field/sample/field-grid.node';
import { FieldDeformNode } from './field/deform/field-deform.node';
import { FieldDisplaceNode } from './field/deform/field-displace.node';
import { FieldScaleNode } from './field/deform/field-scale.node';
import { FieldRotateNode } from './field/deform/field-rotate.node';
import { FieldColorNode } from './field/deform/field-color.node';
import { FieldColorMapNode } from './fields/visualization/field-color-map.node';
import { FieldVectorArrowsNode } from './fields/visualization/field-vector-arrows.node';
import { FieldStreamLinesNode } from './fields/visualization/field-stream-lines.node';
import { FieldHeatMapNode } from './fields/visualization/field-heat-map.node';
import { FieldVolumeNode } from './fields/visualization/field-volume.node';
import { FieldMinMaxNode } from './fields/analysis/field-min-max.node';
import { FieldAverageNode } from './fields/analysis/field-average.node';
import { FieldCriticalPointsNode } from './fields/analysis/field-critical-points.node';
import { FieldDivergenceAnalysisNode } from './fields/analysis/field-divergence-analysis.node';
import { FieldCurlAnalysisNode } from './fields/analysis/field-curl-analysis.node';
import { FieldFluxNode } from './fields/analysis/field-flux.node';
import { FieldCirculationNode } from './fields/analysis/field-circulation.node';
import { FieldPotentialNode } from './fields/analysis/field-potential.node';
import { FieldHistogramNode } from './fields/analysis/field-histogram.node';
import { FieldCorrelationNode } from './fields/analysis/field-correlation.node';
import { FieldMorphingNode } from './fields/advanced/field-morphing.node';
import { FieldWarpNode } from './fields/advanced/field-warp.node';
import { FieldConvolutionNode } from './fields/advanced/field-convolution.node';
import { FieldFourierNode } from './fields/advanced/field-fourier.node';
import { FieldOptimizeNode } from './fields/advanced/field-optimize.node';
import { Voronoi2DNode } from './patterns/voronoi/voronoi2-d.node';
import { Voronoi3DNode } from './patterns/voronoi/voronoi3-d.node';
import { WeightedVoronoiNode } from './patterns/voronoi/weighted-voronoi.node';
import { CentroidalVoronoiNode } from './patterns/voronoi/centroidal-voronoi.node';
import { VoronoiOnSurfaceNode } from './patterns/voronoi/voronoi-on-surface.node';
import { Delaunay2DNode } from './patterns/delaunay/delaunay2-d.node';
import { Delaunay3DNode } from './patterns/delaunay/delaunay3-d.node';
import { ConstrainedDelaunayNode } from './patterns/delaunay/constrained-delaunay.node';
import { AlphaShapeNode } from './patterns/delaunay/alpha-shape.node';
import { VoronoiFractureNode } from './patterns/voronoi/voronoi-fracture.node';
import { VoronoiGrowthNode } from './patterns/voronoi/voronoi-growth.node';
import { DelaunayMeshNode } from './patterns/delaunay/delaunay-mesh.node';
import { VoronoiSkeletonNode } from './patterns/voronoi/voronoi-skeleton.node';
import { VoronoiOffsetNode } from './patterns/voronoi/voronoi-offset.node';
import { ConvexHullNode } from './patterns/delaunay/convex-hull.node';
import { IslamicStarNode } from './patterns/islamic/islamic-star.node';
import { GirihTilingNode } from './patterns/islamic/girih-tiling.node';
import { ArabesqueNode } from './patterns/islamic/arabesque.node';
import { MoorishPatternNode } from './patterns/islamic/moorish-pattern.node';
import { IslamicGridNode } from './patterns/islamic/islamic-grid.node';
import { CelticKnotNode } from './patterns/celtic/celtic-knot.node';
import { CelticBraidNode } from './patterns/celtic/celtic-braid.node';
import { PenroseTilingNode } from './patterns/geometric/penrose-tiling.node';
import { TruchetTilesNode } from './patterns/geometric/truchet-tiles.node';
import { SpiralPatternNode } from './patterns/geometric/spiral-pattern.node';
import { MandalaPatternNode } from './patterns/geometric/mandala-pattern.node';
import { PolygonalTessellationNode } from './patterns/geometric/polygonal-tessellation.node';
import { CirclePackingNode } from './patterns/geometric/circle-packing.node';
import { HyperbolicTilingNode } from './patterns/geometric/hyperbolic-tiling.node';
import { GeodesicPatternNode } from './patterns/geometric/geodesic-pattern.node';
import { MuqarnasNode } from './patterns/islamic/muqarnas.node';
import { QuasiCrystalNode } from './patterns/geometric/quasi-crystal.node';
import { MinimalSurfaceNode } from './patterns/geometric/minimal-surface.node';
import { ReactionDiffusionNode } from './patterns/geometric/reaction-diffusion.node';
import { ParquetDeformationNode } from './patterns/geometric/parquet-deformation.node';
import { KochSnowflakeNode } from './patterns/fractals/koch-snowflake.node';
import { SierpinskiTriangleNode } from './patterns/fractals/sierpinski-triangle.node';
import { MengerSpongeNode } from './patterns/fractals/menger-sponge.node';
import { JuliaSetNode } from './patterns/fractals/julia-set.node';
import { MandelbrotSetNode } from './patterns/fractals/mandelbrot-set.node';
import { LSystem2DNode } from './patterns/l-systems/lsystem2-d.node';
import { LSystem3DNode } from './patterns/l-systems/lsystem3-d.node';
import { TreeGeneratorNode } from './patterns/l-systems/tree-generator.node';
import { DragonCurveNode } from './patterns/fractals/dragon-curve.node';
import { HilbertCurveNode } from './patterns/fractals/hilbert-curve.node';
import { PeanoCurveNode } from './patterns/fractals/peano-curve.node';
import { CantorSetNode } from './patterns/fractals/cantor-set.node';
import { PlantGrowthNode } from './patterns/l-systems/plant-growth.node';
import { BarnsleyFernNode } from './patterns/fractals/barnsley-fern.node';
import { ApollonianGasketNode } from './patterns/fractals/apollonian-gasket.node';
import { RectanglePackingNode } from './patterns/packing/rectangle-packing.node';
import { SpherePackingNode } from './patterns/packing/sphere-packing.node';
import { PolygonPackingNode } from './patterns/packing/polygon-packing.node';
import { CubicLatticeNode } from './patterns/lattice/cubic-lattice.node';
import { OctetLatticeNode } from './patterns/lattice/octet-lattice.node';
import { DiamondLatticeNode } from './patterns/lattice/diamond-lattice.node';
import { KelvinLatticeNode } from './patterns/lattice/kelvin-lattice.node';
import { TPMSLatticeNode } from './patterns/lattice/tpmslattice.node';
import { BrickPatternNode } from './patterns/tiling/brick-pattern.node';
import { ParquetPatternNode } from './patterns/tiling/parquet-pattern.node';
import { WeavePatternNode } from './patterns/tiling/weave-pattern.node';
import { HoneycombPatternNode } from './patterns/cellular/honeycomb-pattern.node';
import { FoamStructureNode } from './patterns/cellular/foam-structure.node';
import { CellularAutomataNode } from './patterns/cellular/cellular-automata.node';
import { ConwayLifeNode } from './patterns/cellular/conway-life.node';
import { PoissonDiskNode } from './patterns/stochastic/poisson-disk.node';
import { BlueNoiseNode } from './patterns/stochastic/blue-noise.node';
import { JitteredGridNode } from './patterns/stochastic/jittered-grid.node';
import { MinimumSpanningTreeNode } from './patterns/network/minimum-spanning-tree.node';
import { RelativeNeighborhoodNode } from './patterns/network/relative-neighborhood.node';
import { BinaryTreeNode } from './patterns/algorithmic/binary-tree.node';
import { MazeGeneratorNode } from './patterns/algorithmic/maze-generator.node';
import { SubdivisionSurfaceNode } from './patterns/algorithmic/subdivision-surface.node';
import { FlockingPatternNode } from './patterns/algorithmic/flocking-pattern.node';
import { DiffusionLimitedAggregationNode } from './patterns/algorithmic/diffusion-limited-aggregation.node';
import { GrammarShapesNode } from './patterns/procedural/grammar-shapes.node';
import { WaveFunctionCollapseNode } from './patterns/procedural/wave-function-collapse.node';
import { MarkovChainNode } from './patterns/procedural/markov-chain.node';
import { GeneticAlgorithmNode } from './patterns/procedural/genetic-algorithm.node';
import { NeuralPatternNode } from './patterns/procedural/neural-pattern.node';
import { StrangeAttractorNode } from './patterns/algorithmic/strange-attractor.node';
import { PhyllotaxisPatternNode } from './patterns/algorithmic/phyllotaxis-pattern.node';
import { TuringPatternNode } from './patterns/procedural/turing-pattern.node';
import { NoisePatternNode } from './patterns/procedural/noise-pattern.node';
import { PackingCirclesNode } from './patterns/algorithmic/packing-circles.node';
import { KMeansClusteringNode } from './patterns/algorithmic/kmeans-clustering.node';
import { ContextFreeArtNode } from './patterns/procedural/context-free-art.node';
import { ProceduralTextureNode } from './patterns/procedural/procedural-texture.node';
import { GraphLayoutNode } from './patterns/algorithmic/graph-layout.node';
import { ShortestPathNode } from './patterns/algorithmic/shortest-path.node';
import { SupportGenerationNode } from './fabrication/3-d-printing/support-generation.node';
import { PrintOrientationNode } from './fabrication/3-d-printing/print-orientation.node';
import { SliceModelNode } from './fabrication/3-d-printing/slice-model.node';
import { BridgeDetectionNode } from './fabrication/3-d-printing/bridge-detection.node';
import { WallThicknessNode } from './fabrication/3-d-printing/wall-thickness.node';
import { PrintTimeEstimateNode } from './fabrication/3-d-printing/print-time-estimate.node';
import { RaftGenerationNode } from './fabrication/3-d-printing/raft-generation.node';
import { BrimGenerationNode } from './fabrication/3-d-printing/brim-generation.node';
import { SeamOptimizationNode } from './fabrication/3-d-printing/seam-optimization.node';
import { InfillOptimizationNode } from './fabrication/3-d-printing/infill-optimization.node';
import { CoolingAnalysisNode } from './fabrication/3-d-printing/cooling-analysis.node';
import { RetractionOptimizationNode } from './fabrication/3-d-printing/retraction-optimization.node';
import { VaseModeNode } from './fabrication/3-d-printing/vase-mode.node';
import { MultiMaterialSetupNode } from './fabrication/3-d-printing/multi-material-setup.node';
import { TreeSupportsNode } from './fabrication/3-d-printing/tree-supports.node';
import { IroningPassNode } from './fabrication/3-d-printing/ironing-pass.node';
import { FuzzySkinnNode } from './fabrication/3-d-printing/fuzzy-skinn.node';
import { CoastingSetupNode } from './fabrication/3-d-printing/coasting-setup.node';
import { WipeTowerNode } from './fabrication/3-d-printing/wipe-tower.node';
import { AdaptiveLayerHeightNode } from './fabrication/3-d-printing/adaptive-layer-height.node';
import { PerimeterGeneratorNode } from './fabrication/3-d-printing/perimeter-generator.node';
import { GCodePostProcessorNode } from './fabrication/3-d-printing/gcode-post-processor.node';
import { NonPlanarSlicingNode } from './fabrication/3-d-printing/non-planar-slicing.node';
import { ConicalSlicingNode } from './fabrication/3-d-printing/conical-slicing.node';
import { SolubleSupportInterfaceNode } from './fabrication/3-d-printing/soluble-support-interface.node';
import { ToolpathGenerationNode } from './fabrication/cnc/toolpath-generation.node';
import { PocketingStrategyNode } from './fabrication/cnc/pocketing-strategy.node';
import { ContouringToolpathNode } from './fabrication/cnc/contouring-toolpath.node';
import { DrillingOperationNode } from './fabrication/cnc/drilling-operation.node';
import { ThreadMillingNode } from './fabrication/cnc/thread-milling.node';
import { AdaptiveClearingNode } from './fabrication/cnc/adaptive-clearing.node';
import { TrochoidalMillingNode } from './fabrication/cnc/trochoidal-milling.node';
import { RestMachiningNode } from './fabrication/cnc/rest-machining.node';
import { ToolCompensationNode } from './fabrication/cnc/tool-compensation.node';
import { HelicalEntryNode } from './fabrication/cnc/helical-entry.node';
import { RampEntryNode } from './fabrication/cnc/ramp-entry.node';
import { HighSpeedMachiningNode } from './fabrication/cnc/high-speed-machining.node';
import { ScallopHeightNode } from './fabrication/cnc/scallop-height.node';
import { CollisionDetectionNode } from './fabrication/cnc/collision-detection.node';
import { FeedsAndSpeedsNode } from './fabrication/cnc/feeds-and-speeds.node';
import { FiveAxisPositioningNode } from './fabrication/cnc/five-axis-positioning.node';
import { SwarmMillingNode } from './fabrication/cnc/swarm-milling.node';
import { ToolLibraryNode } from './fabrication/cnc/tool-library.node';
import { WorkCoordinateNode } from './fabrication/cnc/work-coordinate.node';
import { PostProcessorNode } from './fabrication/cnc/post-processor.node';
import { ChipEvacuationNode } from './fabrication/cnc/chip-evacuation.node';
import { CutterEngagementNode } from './fabrication/cnc/cutter-engagement.node';
import { ToolWearNode } from './fabrication/cnc/tool-wear.node';
import { SetupSheetsNode } from './fabrication/cnc/setup-sheets.node';
import { ProbeRoutineNode } from './fabrication/cnc/probe-routine.node';
import { LaserPathNode } from './fabrication/laser/laser-path.node';
import { TabsAndSlotsNode } from './fabrication/laser/tabs-and-slots.node';
import { LivingHingeNode } from './fabrication/laser/living-hinge.node';
import { KerfBendingNode } from './fabrication/laser/kerf-bending.node';
import { PowerMappingNode } from './fabrication/laser/power-mapping.node';
import { EngraveRasterNode } from './fabrication/laser/engrave-raster.node';
import { VectorEngraveNode } from './fabrication/laser/vector-engrave.node';
import { NestingOptimizationNode } from './fabrication/laser/nesting-optimization.node';
import { CutOrderOptimizationNode } from './fabrication/laser/cut-order-optimization.node';
import { LeadInOutNode } from './fabrication/laser/lead-in-out.node';
import { BridgeGenerationNode } from './fabrication/laser/bridge-generation.node';
import { FocusCompensationNode } from './fabrication/laser/focus-compensation.node';
import { HatchFillNode } from './fabrication/laser/hatch-fill.node';
import { TextEngravingNode } from './fabrication/laser/text-engraving.node';
import { MaterialDatabaseNode } from './fabrication/laser/material-database.node';
import { LayerSeparationNode } from './fabrication/laser/layer-separation.node';
import { MultiplePassesNode } from './fabrication/laser/multiple-passes.node';
import { CleanupPathsNode } from './fabrication/laser/cleanup-paths.node';
import { PierceOptimizationNode } from './fabrication/laser/pierce-optimization.node';
import { MicroJointsNode } from './fabrication/laser/micro-joints.node';
import { CutQualityNode } from './fabrication/laser/cut-quality.node';
import { RotaryAttachmentNode } from './fabrication/laser/rotary-attachment.node';
import { AirAssistNode } from './fabrication/laser/air-assist.node';
import { SafetyZonesNode } from './fabrication/laser/safety-zones.node';
import { JobTimeEstimateNode } from './fabrication/laser/job-time-estimate.node';
import { RobotKinematicsNode } from './fabrication/robotics/robot-kinematics.node';
import { PathPlanningNode } from './fabrication/robotics/path-planning.node';
import { CollisionAvoidanceNode } from './fabrication/robotics/collision-avoidance.node';
import { EndEffectorSetupNode } from './fabrication/robotics/end-effector-setup.node';
import { WorkCellSetupNode } from './fabrication/robotics/work-cell-setup.node';
import { TrajectoryOptimizationNode } from './fabrication/robotics/trajectory-optimization.node';
import { SingularityAvoidanceNode } from './fabrication/robotics/singularity-avoidance.node';
import { RobotCalibrationNode } from './fabrication/robotics/robot-calibration.node';
import { ForceControlNode } from './fabrication/robotics/force-control.node';
import { WeldingPathNode } from './fabrication/robotics/welding-path.node';
import { PickAndPlaceNode } from './fabrication/robotics/pick-and-place.node';
import { PalletizingPatternNode } from './fabrication/robotics/palletizing-pattern.node';
import { RoboticMillingNode } from './fabrication/robotics/robotic-milling.node';
import { SprayPaintingNode } from './fabrication/robotics/spray-painting.node';
import { AdditiveManufacturingNode } from './fabrication/robotics/additive-manufacturing.node';
import { VisionGuidanceNode } from './fabrication/robotics/vision-guidance.node';
import { MultiRobotCoordinationNode } from './fabrication/robotics/multi-robot-coordination.node';
import { ConveyorTrackingNode } from './fabrication/robotics/conveyor-tracking.node';
import { SafetyZoneSetupNode } from './fabrication/robotics/safety-zone-setup.node';
import { RobotSimulationNode } from './fabrication/robotics/robot-simulation.node';
import { PostProcessorRobotNode } from './fabrication/robotics/post-processor-robot.node';
import { ReachAnalysisNode } from './fabrication/robotics/reach-analysis.node';
import { JointLimitAvoidanceNode } from './fabrication/robotics/joint-limit-avoidance.node';
import { ToolChangerSetupNode } from './fabrication/robotics/tool-changer-setup.node';
import { RobotMaintenanceNode } from './fabrication/robotics/robot-maintenance.node';
import { StraightWallNode } from './architecture/walls/straight-wall.node';
import { CurvedWallNode } from './architecture/walls/curved-wall.node';
import { CompoundWallNode } from './architecture/walls/compound-wall.node';
import { CurtainWallNode } from './architecture/walls/curtain-wall.node';
import { WallOpeningNode } from './architecture/walls/wall-opening.node';
import { WallJoinNode } from './architecture/walls/wall-join.node';
import { RetainingWallNode } from './architecture/walls/retaining-wall.node';
import { StudWallNode } from './architecture/walls/stud-wall.node';
import { InsulatedWallNode } from './architecture/walls/insulated-wall.node';
import { TiltUpPanelNode } from './architecture/walls/tilt-up-panel.node';
import { ParapetWallNode } from './architecture/walls/parapet-wall.node';
import { FireWallNode } from './architecture/walls/fire-wall.node';
import { MovablePartitionNode } from './architecture/walls/movable-partition.node';
import { SoundproofWallNode } from './architecture/walls/soundproof-wall.node';
import { GreenWallNode } from './architecture/walls/green-wall.node';
import { DoubleSkinnedFacadeNode } from './architecture/walls/double-skinned-facade.node';
import { RainScreenNode } from './architecture/walls/rain-screen.node';
import { ShearWallNode } from './architecture/walls/shear-wall.node';
import { FoundationWallNode } from './architecture/walls/foundation-wall.node';
import { HistoricWallRestorationNode } from './architecture/walls/historic-wall-restoration.node';
import { SlabOnGradeNode } from './architecture/floors/slab-on-grade.node';
import { CompositeFloorNode } from './architecture/floors/composite-floor.node';
import { RaisedFloorNode } from './architecture/floors/raised-floor.node';
import { WoodJoistFloorNode } from './architecture/floors/wood-joist-floor.node';
import { PostTensionedSlabNode } from './architecture/floors/post-tensioned-slab.node';
import { SuspendedCeilingNode } from './architecture/ceilings/suspended-ceiling.node';
import { CofferedCeilingNode } from './architecture/ceilings/coffered-ceiling.node';
import { VaultedCeilingNode } from './architecture/ceilings/vaulted-ceiling.node';
import { MezzanineFloorNode } from './architecture/floors/mezzanine-floor.node';
import { EpoxyFloorNode } from './architecture/floors/epoxy-floor.node';
import { RadiantFloorNode } from './architecture/floors/radiant-floor.node';
import { AcousticCeilingNode } from './architecture/ceilings/acoustic-ceiling.node';
import { FloorDrainageNode } from './architecture/floors/floor-drainage.node';
import { StretchCeilingNode } from './architecture/ceilings/stretch-ceiling.node';
import { GreenRoofNode } from './architecture/floors/green-roof.node';
import { FloorExpansionJointNode } from './architecture/floors/floor-expansion-joint.node';
import { SkyLightNode } from './architecture/ceilings/sky-light.node';
import { FloorFinishNode } from './architecture/floors/floor-finish.node';
import { CeilingBeamNode } from './architecture/ceilings/ceiling-beam.node';
import { PedestalPaversNode } from './architecture/floors/pedestal-pavers.node';
import { StraightStairNode } from './architecture/stairs/straight-stair.node';
import { LShapedStairNode } from './architecture/stairs/lshaped-stair.node';
import { UShapedStairNode } from './architecture/stairs/ushaped-stair.node';
import { SpiralStairNode } from './architecture/stairs/spiral-stair.node';
import { HelicalStairNode } from './architecture/stairs/helical-stair.node';
import { WinderStairNode } from './architecture/stairs/winder-stair.node';
import { StraightRampNode } from './architecture/ramps/straight-ramp.node';
import { SwitchbackRampNode } from './architecture/ramps/switchback-ramp.node';
import { HelicalRampNode } from './architecture/ramps/helical-ramp.node';
import { StairHandrailNode } from './architecture/stairs/stair-handrail.node';
import { StairBalustradeNode } from './architecture/stairs/stair-balustrade.node';
import { StairNosingNode } from './architecture/stairs/stair-nosing.node';
import { StairStringerNode } from './architecture/stairs/stair-stringer.node';
import { EscapeStairNode } from './architecture/stairs/escape-stair.node';
import { MonumentalStairNode } from './architecture/stairs/monumental-stair.node';
import { FloatingStairNode } from './architecture/stairs/floating-stair.node';
import { LoadingDockNode } from './architecture/ramps/loading-dock.node';
import { CurbRampNode } from './architecture/ramps/curb-ramp.node';
import { AlternatingTreadStairNode } from './architecture/stairs/alternating-tread-stair.node';
import { VehicleRampNode } from './architecture/ramps/vehicle-ramp.node';
import { SingleDoorNode } from './architecture/doors/single-door.node';
import { DoubleDoorNode } from './architecture/doors/double-door.node';
import { SlidingDoorNode } from './architecture/doors/sliding-door.node';
import { RevolvingDoorNode } from './architecture/doors/revolving-door.node';
import { FoldingDoorNode } from './architecture/doors/folding-door.node';
import { RollupDoorNode } from './architecture/doors/rollup-door.node';
import { CasementWindowNode } from './architecture/windows/casement-window.node';
import { SlidingWindowNode } from './architecture/windows/sliding-window.node';
import { DoubleHungWindowNode } from './architecture/windows/double-hung-window.node';
import { AwningWindowNode } from './architecture/windows/awning-window.node';
import { BayWindowNode } from './architecture/windows/bay-window.node';
import { BowWindowNode } from './architecture/windows/bow-window.node';
import { ClerestroyWindowNode } from './architecture/windows/clerestroy-window.node';
import { FireDoorNode } from './architecture/doors/fire-door.node';
import { SecurityDoorNode } from './architecture/doors/security-door.node';
import { StainedGlassWindowNode } from './architecture/windows/stained-glass-window.node';
import { OverheadDoorNode } from './architecture/doors/overhead-door.node';
import { JalousieWindowNode } from './architecture/windows/jalousie-window.node';
import { DutchDoorNode } from './architecture/doors/dutch-door.node';
import { GothicWindowNode } from './architecture/windows/gothic-window.node';
import { SpurGearNode } from './mechanicalengineering/gears/spur-gear.node';
import { HelicalGearNode } from './mechanicalengineering/gears/helical-gear.node';
import { BevelGearNode } from './mechanicalengineering/gears/bevel-gear.node';
import { WormGearNode } from './mechanicalengineering/gears/worm-gear.node';
import { WormShaftNode } from './mechanicalengineering/gears/worm-shaft.node';
import { RackGearNode } from './mechanicalengineering/gears/rack-gear.node';
import { InternalGearNode } from './mechanicalengineering/gears/internal-gear.node';
import { PlanetaryGearSetNode } from './mechanicalengineering/gears/planetary-gear-set.node';
import { TimingPulleyNode } from './mechanicalengineering/gears/timing-pulley.node';
import { ChainSprocketNode } from './mechanicalengineering/gears/chain-sprocket.node';
import { CVTDiscNode } from './mechanicalengineering/gears/cvtdisc.node';
import { DifferentialGearNode } from './mechanicalengineering/gears/differential-gear.node';
import { BallBearingNode } from './mechanicalengineering/bearings/ball-bearing.node';
import { RollerBearingNode } from './mechanicalengineering/bearings/roller-bearing.node';
import { ThrustBearingNode } from './mechanicalengineering/bearings/thrust-bearing.node';
import { NeedleBearingNode } from './mechanicalengineering/bearings/needle-bearing.node';
import { LinearBearingNode } from './mechanicalengineering/bearings/linear-bearing.node';
import { PillowBlockNode } from './mechanicalengineering/bearings/pillow-block.node';
import { FlangeBearingNode } from './mechanicalengineering/bearings/flange-bearing.node';
import { BronzeBushingNode } from './mechanicalengineering/bearings/bronze-bushing.node';
import { SphericalBearingNode } from './mechanicalengineering/bearings/spherical-bearing.node';
import { AirBearingNode } from './mechanicalengineering/bearings/air-bearing.node';
import { HexBoltNode } from './mechanicalengineering/fasteners/hex-bolt.node';
import { SocketHeadCapScrewNode } from './mechanicalengineering/fasteners/socket-head-cap-screw.node';
import { HexNutNode } from './mechanicalengineering/fasteners/hex-nut.node';
import { WasherNode } from './mechanicalengineering/fasteners/washer.node';
import { ThreadInsertNode } from './mechanicalengineering/fasteners/thread-insert.node';
import { RivetNode } from './mechanicalengineering/fasteners/rivet.node';
import { ClampingCollarNode } from './mechanicalengineering/fasteners/clamping-collar.node';
import { DowelNode } from './mechanicalengineering/fasteners/dowel.node';
import { RetainingRingNode } from './mechanicalengineering/fasteners/retaining-ring.node';
import { KeywayJointNode } from './mechanicalengineering/fasteners/keyway-joint.node';
import { CompressionSpringNode } from './mechanicalengineering/springs/compression-spring.node';
import { ExtensionSpringNode } from './mechanicalengineering/springs/extension-spring.node';
import { TorsionSpringNode } from './mechanicalengineering/springs/torsion-spring.node';
import { LeafSpringNode } from './mechanicalengineering/springs/leaf-spring.node';
import { GasSpringNode } from './mechanicalengineering/springs/gas-spring.node';
import { CamProfileNode } from './mechanicalengineering/mechanisms/cam-profile.node';
import { LinkageMechanismNode } from './mechanicalengineering/mechanisms/linkage-mechanism.node';
import { RatchetMechanismNode } from './mechanicalengineering/mechanisms/ratchet-mechanism.node';
import { ClutchMechanismNode } from './mechanicalengineering/mechanisms/clutch-mechanism.node';
import { UniversalJointNode } from './mechanicalengineering/mechanisms/universal-joint.node';
import { SteppedShaftNode } from './mechanicalengineering/shafts/stepped-shaft.node';
import { SplinedShaftNode } from './mechanicalengineering/shafts/splined-shaft.node';
import { FlexibleShaftNode } from './mechanicalengineering/shafts/flexible-shaft.node';
import { HollowShaftNode } from './mechanicalengineering/shafts/hollow-shaft.node';
import { RigidCouplingNode } from './mechanicalengineering/couplings/rigid-coupling.node';
import { FlexibleCouplingNode } from './mechanicalengineering/couplings/flexible-coupling.node';
import { OldhamCouplingNode } from './mechanicalengineering/couplings/oldham-coupling.node';
import { FluidCouplingNode } from './mechanicalengineering/couplings/fluid-coupling.node';
import { PulleySystemNode } from './mechanicalengineering/power-transmission/pulley-system.node';
import { ChainDriveNode } from './mechanicalengineering/power-transmission/chain-drive.node';
import { CurvatureCombNode } from './analysis/curves/curvature-comb.node';
import { CurveLengthNode } from './analysis/curves/curve-length.node';
import { CurveSmoothnessAnalysisNode } from './analysis/curves/curve-smoothness-analysis.node';
import { CurveInflectionPointsNode } from './analysis/curves/curve-inflection-points.node';
import { CurveTorsionNode } from './analysis/curves/curve-torsion.node';
import { CurveDerivativesNode } from './analysis/curves/curve-derivatives.node';
import { CurveParameterNode } from './analysis/curves/curve-parameter.node';
import { CurveEndpointsNode } from './analysis/curves/curve-endpoints.node';
import { CurveClosestPointNode } from './analysis/curves/curve-closest-point.node';
import { CurveExtremePointsNode } from './analysis/curves/curve-extreme-points.node';
import { CurveAreaMomentsNode } from './analysis/curves/curve-area-moments.node';
import { CurveConvexHullNode } from './analysis/curves/curve-convex-hull.node';
import { CurveBoundingBoxNode } from './analysis/curves/curve-bounding-box.node';
import { CurveSpiralNode } from './analysis/curves/curve-spiral.node';
import { SurfaceCurvatureNode } from './analysis/surfaces/surface-curvature.node';
import { SurfaceNormalsNode } from './analysis/surfaces/surface-normals.node';
import { SurfaceAreaNode } from './analysis/surfaces/surface-area.node';
import { SurfaceIsoCurvesNode } from './analysis/surfaces/surface-iso-curves.node';
import { SurfaceParametrizationNode } from './analysis/surfaces/surface-parametrization.node';
import { SurfaceDerivativesNode } from './analysis/surfaces/surface-derivatives.node';
import { SurfaceClosestPointNode } from './analysis/surfaces/surface-closest-point.node';
import { SurfaceBoundaryNode } from './analysis/surfaces/surface-boundary.node';
import { SurfaceContinuityNode } from './analysis/surfaces/surface-continuity.node';
import { SurfaceDeviationNode } from './analysis/surfaces/surface-deviation.node';
import { SurfaceFlatnessNode } from './analysis/surfaces/surface-flatness.node';
import { SurfaceRoughnessNode } from './analysis/surfaces/surface-roughness.node';
import { CurveCurveIntersectionNode } from './analysis/intersection/curve-curve-intersection.node';
import { CurveSurfaceIntersectionNode } from './analysis/intersection/curve-surface-intersection.node';
import { SurfaceSurfaceIntersectionNode } from './analysis/intersection/surface-surface-intersection.node';
import { PlaneIntersectionNode } from './analysis/intersection/plane-intersection.node';
import { RayIntersectionNode } from './analysis/intersection/ray-intersection.node';
import { MinimumDistanceNode } from './analysis/proximity/minimum-distance.node';
import { ProximityAnalysisNode } from './analysis/proximity/proximity-analysis.node';
import { ClearanceCheckNode } from './analysis/proximity/clearance-check.node';
import { CollisionDetectionNode } from './analysis/proximity/collision-detection.node';
import { VisibilityAnalysisNode } from './analysis/proximity/visibility-analysis.node';
import { ShadowAnalysisNode } from './analysis/proximity/shadow-analysis.node';
import { VolumeCalculationNode } from './analysis/measurement/volume-calculation.node';
import { AngleMeasurementNode } from './analysis/measurement/angle-measurement.node';
import { DistanceMeasurementNode } from './analysis/measurement/distance-measurement.node';
import { GeometryValidationNode } from './analysis/quality/geometry-validation.node';
import { MeshQualityNode } from './analysis/quality/mesh-quality.node';
import { ToleranceAnalysisNode } from './analysis/quality/tolerance-analysis.node';
import { STEPImportNode } from './interoperability/import/stepimport.node';
import { STEPExportNode } from './interoperability/export/stepexport.node';
import { IGESImportNode } from './interoperability/import/igesimport.node';
import { IGESExportNode } from './interoperability/export/igesexport.node';
import { STLImportNode } from './interoperability/import/stlimport.node';
import { STLExportNode } from './interoperability/export/stlexport.node';
import { OBJImportNode } from './interoperability/import/objimport.node';
import { OBJExportNode } from './interoperability/export/objexport.node';
import { PLYImportNode } from './interoperability/import/plyimport.node';
import { PLYExportNode } from './interoperability/export/plyexport.node';
import { ThreeMFImportNode } from './interoperability/import/three-mfimport.node';
import { ThreeMFExportNode } from './interoperability/export/three-mfexport.node';
import { DXFImportNode } from './interoperability/import/dxfimport.node';
import { DXFExportNode } from './interoperability/export/dxfexport.node';
import { SVGImportNode } from './interoperability/import/svgimport.node';
import { SVGExportNode } from './interoperability/export/svgexport.node';
import { SQLQueryNode } from './interoperability/database/sqlquery.node';
import { SQLInsertNode } from './interoperability/database/sqlinsert.node';
import { HTTPRequestNode } from './interoperability/api/httprequest.node';
import { JSONParserNode } from './interoperability/api/jsonparser.node';
import { JSONGeneratorNode } from './interoperability/api/jsongenerator.node';
import { S3UploadNode } from './interoperability/cloud/s3-upload.node';
import { S3DownloadNode } from './interoperability/cloud/s3-download.node';
import { EmailSenderNode } from './interoperability/messaging/email-sender.node';
import { SlackNotificationNode } from './interoperability/messaging/slack-notification.node';
import { CSVReaderNode } from './interoperability/data/csvreader.node';
import { CSVWriterNode } from './interoperability/data/csvwriter.node';
import { ExcelReaderNode } from './interoperability/data/excel-reader.node';
import { ExcelWriterNode } from './interoperability/data/excel-writer.node';
import { GrasshopperExportNode } from './interoperability/integration/grasshopper-export.node';
import { WebSocketClientNode } from './interoperability/streaming/web-socket-client.node';
import { MQTTPublisherNode } from './interoperability/streaming/mqttpublisher.node';
import { MQTTSubscriberNode } from './interoperability/streaming/mqttsubscriber.node';
import { SerialPortNode } from './interoperability/streaming/serial-port.node';
import { TCPClientNode } from './interoperability/streaming/tcpclient.node';
import { GeneticOptimizerNode } from './algorithmic/optimization/genetic-optimizer.node';
import { ParticleSwarmOptimizerNode } from './algorithmic/optimization/particle-swarm-optimizer.node';
import { SimulatedAnnealingNode } from './algorithmic/optimization/simulated-annealing.node';
import { GradientDescentNode } from './algorithmic/optimization/gradient-descent.node';
import { TopologyOptimizerNode } from './algorithmic/optimization/topology-optimizer.node';
import { LinearRegressionNode } from './algorithmic/machine-learning/linear-regression.node';
import { KMeansClusteringNode } from './algorithmic/machine-learning/kmeans-clustering.node';
import { DecisionTreeNode } from './algorithmic/machine-learning/decision-tree.node';
import { NeuralNetworkNode } from './algorithmic/machine-learning/neural-network.node';
import { SupportVectorMachineNode } from './algorithmic/machine-learning/support-vector-machine.node';
import { ConvexHull3DNode } from './algorithmic/geometry/convex-hull3-d.node';
import { AlphaShapeNode } from './algorithmic/geometry/alpha-shape.node';
import { MinimumSpanningTreeNode } from './algorithmic/geometry/minimum-spanning-tree.node';
import { ShortestPathNode } from './algorithmic/geometry/shortest-path.node';
import { VisibilityGraphNode } from './algorithmic/geometry/visibility-graph.node';
import { MedialAxisNode } from './algorithmic/geometry/medial-axis.node';
import { DistanceFieldNode } from './algorithmic/geometry/distance-field.node';
import { MarchingCubesNode } from './algorithmic/geometry/marching-cubes.node';
import { SpacePartitioningNode } from './algorithmic/geometry/space-partitioning.node';
import { VoxelGridNode } from './algorithmic/geometry/voxel-grid.node';
import { PointCloudProcessingNode } from './algorithmic/geometry/point-cloud-processing.node';
import { SurfaceReconstructionNode } from './algorithmic/geometry/surface-reconstruction.node';
import { GeometrySimplificationNode } from './algorithmic/geometry/geometry-simplification.node';
import { GeometryMatchingNode } from './algorithmic/geometry/geometry-matching.node';
import { ShapeDescriptorNode } from './algorithmic/geometry/shape-descriptor.node';

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
  GearNode,
  CamNode,
  SlotNode,
  PathNode,
  RevoluteNode,
  PrismaticNode,
  CylindricalNode,
  SphericalNode,
  PlanarNode,
  UniversalNode,
  FixedNode,
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
  SlotNode,
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
  WrapNode,
  DomeNode,
  FlexNode,
  IndentNode,
  DeformNode,
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
  ExportDXFNode,
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
  TangentNode,
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
  ReactionDiffusionNode,
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
  SubdivisionSurfaceNode,
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
  KMeansClusteringNode,
  ContextFreeArtNode,
  ProceduralTextureNode,
  GraphLayoutNode,
  ShortestPathNode,
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
  CollisionDetectionNode,
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
  SurfaceDeviationNode,
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
  CollisionDetectionNode,
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
  KMeansClusteringNode,
  DecisionTreeNode,
  NeuralNetworkNode,
  SupportVectorMachineNode,
  ConvexHull3DNode,
  AlphaShapeNode,
  MinimumSpanningTreeNode,
  ShortestPathNode,
  VisibilityGraphNode,
  MedialAxisNode,
  DistanceFieldNode,
  MarchingCubesNode,
  SpacePartitioningNode,
  VoxelGridNode,
  PointCloudProcessingNode,
  SurfaceReconstructionNode,
  GeometrySimplificationNode,
  GeometryMatchingNode,
  ShapeDescriptorNode,
};

// Registry for dynamic loading
export const nodeRegistry = {
  'Features::SimpleHole': SimpleHoleNode,
  'Features::CounterboreHole': CounterboreHoleNode,
  'Features::CountersinkHole': CountersinkHoleNode,
  'Features::ThreadedHole': ThreadedHoleNode,
  'Features::RectangularPocket': RectangularPocketNode,
  'Features::CircularPocket': CircularPocketNode,
  'Features::LinearRib': LinearRibNode,
  'Features::MountingBoss': MountingBossNode,
  'Transform::LinearPattern': LinearPatternNode,
  'Transform::CircularPattern': CircularPatternNode,
  'Transform::RectangularPattern': RectangularPatternNode,
  'Transform::Move': MoveNode,
  'Transform::Rotate': RotateNode,
  'Transform::Scale': ScaleNode,
  'Transform::Mirror': MirrorNode,
  'Transform::LinearArray': LinearArrayNode,
  'Transform::PolarArray': PolarArrayNode,
  'Transform::PathArray': PathArrayNode,
  'Transform::GridArray': GridArrayNode,
  'Transform::Align': AlignNode,
  'Transform::Orient': OrientNode,
  'Transform::ProjectToPlane': ProjectToPlaneNode,
  'Transform::Wrap': WrapNode,
  'Transform::Deform': DeformNode,
  'Transform::BoundingBoxAlign': BoundingBoxAlignNode,
  'Transform::MatrixTransform': MatrixTransformNode,
  'Solid::Prism': PrismNode,
  'Solid::Wedge': WedgeNode,
  'Solid::Pyramid': PyramidNode,
  'Solid::BezierSurface': BezierSurfaceNode,
  'Solid::BSplineSurface': BSplineSurfaceNode,
  'Solid::RuledSurface': RuledSurfaceNode,
  'Solid::Helix': HelixNode,
  'Solid::Spring': SpringNode,
  'Solid::Thread': ThreadNode,
  'Solid::Box': BoxNode,
  'Solid::Sphere': SphereNode,
  'Solid::Cylinder': CylinderNode,
  'Solid::Cone': ConeNode,
  'Solid::Torus': TorusNode,
  'Solid::Ellipsoid': EllipsoidNode,
  'Solid::Capsule': CapsuleNode,
  'Solid::RoundedBox': RoundedBoxNode,
  'Solid::Pipe': PipeNode,
  'Solid::Polyhedron': PolyhedronNode,
  'Sketch::Ellipse': EllipseNode,
  'Sketch::Parabola': ParabolaNode,
  'Sketch::Hyperbola': HyperbolaNode,
  'Sketch::Spiral': SpiralNode,
  'Sketch::Polygon': PolygonNode,
  'Sketch::Star': StarNode,
  'Sketch::Gear': GearNode,
  'Sketch::Line': LineNode,
  'Sketch::Arc': ArcNode,
  'Sketch::Circle': CircleNode,
  'Sketch::Rectangle': RectangleNode,
  'Sketch::Polyline': PolylineNode,
  'Sketch::Spline': SplineNode,
  'Sketch::BezierCurve': BezierCurveNode,
  'Sketch::BSplineCurve': BSplineCurveNode,
  'Sketch::Point': PointNode,
  'Sketch::Slot': SlotNode,
  'Sketch::Text': TextNode,
  'Sketch::Offset': OffsetNode,
  'Sketch::Fillet2D': Fillet2DNode,
  'Sketch::Chamfer2D': Chamfer2DNode,
  'Sketch::Trim': TrimNode,
  'Boolean::Union': UnionNode,
  'Boolean::Difference': DifferenceNode,
  'Boolean::Intersection': IntersectionNode,
  'Boolean::XOR': XORNode,
  'Boolean::Split': SplitNode,
  'Boolean::Fragment': FragmentNode,
  'Boolean::CommonEdges': CommonEdgesNode,
  'Boolean::Imprint': ImprintNode,
  'Boolean::Glue': GlueNode,
  'Boolean::Compound': CompoundNode,
  'Assembly::Coincident': CoincidentNode,
  'Assembly::Parallel': ParallelNode,
  'Assembly::Perpendicular': PerpendicularNode,
  'Assembly::Tangent': TangentNode,
  'Assembly::Concentric': ConcentricNode,
  'Assembly::Distance': DistanceNode,
  'Assembly::Angle': AngleNode,
  'Assembly::Horizontal': HorizontalNode,
  'Assembly::Vertical': VerticalNode,
  'Assembly::Fixed': FixedNode,
  'Assembly::FaceToFace': FaceToFaceNode,
  'Assembly::EdgeToEdge': EdgeToEdgeNode,
  'Assembly::PointToPoint': PointToPointNode,
  'Assembly::AxisToAxis': AxisToAxisNode,
  'Assembly::PlaneToPlane': PlaneToPlaneNode,
  'Assembly::Fastened': FastenedNode,
  'Assembly::Gear': GearNode,
  'Assembly::Cam': CamNode,
  'Assembly::Slot': SlotNode,
  'Assembly::Path': PathNode,
  'Assembly::Revolute': RevoluteNode,
  'Assembly::Prismatic': PrismaticNode,
  'Assembly::Cylindrical': CylindricalNode,
  'Assembly::Spherical': SphericalNode,
  'Assembly::Planar': PlanarNode,
  'Assembly::Universal': UniversalNode,
  'Assembly::Fixed': FixedNode,
  'Assembly::Screw': ScrewNode,
  'Assembly::Belt': BeltNode,
  'Assembly::RackPinion': RackPinionNode,
  'Assembly::ComponentPattern': ComponentPatternNode,
  'Assembly::FlexibleSubAssembly': FlexibleSubAssemblyNode,
  'Assembly::Configuration': ConfigurationNode,
  'Assembly::ExplodedView': ExplodedViewNode,
  'Assembly::BillOfMaterials': BillOfMaterialsNode,
  'Assembly::InterferenceCheck': InterferenceCheckNode,
  'Assembly::MotionStudy': MotionStudyNode,
  'Assembly::Envelope': EnvelopeNode,
  'Assembly::SmartFasteners': SmartFastenersNode,
  'Assembly::ContactSet': ContactSetNode,
  'SheetMetal::EdgeFlange': EdgeFlangeNode,
  'SheetMetal::ContourFlange': ContourFlangeNode,
  'SheetMetal::MiterFlange': MiterFlangeNode,
  'SheetMetal::SketchedBend': SketchedBendNode,
  'SheetMetal::Hem': HemNode,
  'SheetMetal::Jog': JogNode,
  'SheetMetal::CornerRelief': CornerReliefNode,
  'SheetMetal::BendRelief': BendReliefNode,
  'SheetMetal::ClosedCorner': ClosedCornerNode,
  'SheetMetal::Tab': TabNode,
  'SheetMetal::Slot': SlotNode,
  'SheetMetal::Louver': LouverNode,
  'SheetMetal::Lance': LanceNode,
  'SheetMetal::Bead': BeadNode,
  'SheetMetal::Unfold': UnfoldNode,
  'SheetMetal::Fold': FoldNode,
  'SheetMetal::ExportDXF': ExportDXFNode,
  'SheetMetal::SheetMetalStyle': SheetMetalStyleNode,
  'SheetMetal::BendTable': BendTableNode,
  'SheetMetal::CostEstimate': CostEstimateNode,
  'Advanced::Sweep': SweepNode,
  'Advanced::HelicalSweep': HelicalSweepNode,
  'Advanced::Loft': LoftNode,
  'Advanced::BlendSurface': BlendSurfaceNode,
  'Advanced::Boundary': BoundaryNode,
  'Advanced::Shell': ShellNode,
  'Advanced::VariableShell': VariableShellNode,
  'Advanced::Thicken': ThickenNode,
  'Advanced::OffsetSurface': OffsetSurfaceNode,
  'Advanced::Draft': DraftNode,
  'Advanced::PartingLineDraft': PartingLineDraftNode,
  'Advanced::StepDraft': StepDraftNode,
  'Advanced::TrimSurface': TrimSurfaceNode,
  'Advanced::ExtendSurface': ExtendSurfaceNode,
  'Advanced::UntrimSurface': UntrimSurfaceNode,
  'Advanced::KnitSurfaces': KnitSurfacesNode,
  'Advanced::PatchSurface': PatchSurfaceNode,
  'Advanced::Wrap': WrapNode,
  'Advanced::Dome': DomeNode,
  'Advanced::Flex': FlexNode,
  'Advanced::Indent': IndentNode,
  'Advanced::Deform': DeformNode,
  'Advanced::HealShape': HealShapeNode,
  'Advanced::RemoveFeatures': RemoveFeaturesNode,
  'Advanced::DeleteFace': DeleteFaceNode,
  'Advanced::SimplifyShape': SimplifyShapeNode,
  'Advanced::CheckGeometry': CheckGeometryNode,
  'Surface::NurbsSurface': NurbsSurfaceNode,
  'Surface::NetworkSurface': NetworkSurfaceNode,
  'Surface::SurfaceFromPoints': SurfaceFromPointsNode,
  'Surface::CoonsPatch': CoonsPatchNode,
  'Surface::GordonSurface': GordonSurfaceNode,
  'Surface::NurbsCurve': NurbsCurveNode,
  'Surface::InterpolateCurve': InterpolateCurveNode,
  'Surface::ApproximateCurve': ApproximateCurveNode,
  'Surface::BlendCurve': BlendCurveNode,
  'Surface::CompositeCurve': CompositeCurveNode,
  'Surface::CurvatureAnalysis': CurvatureAnalysisNode,
  'Surface::ZebraAnalysis': ZebraAnalysisNode,
  'Surface::DraftAnalysis': DraftAnalysisNode,
  'Surface::ContinuityCheck': ContinuityCheckNode,
  'Surface::SurfaceDeviation': SurfaceDeviationNode,
  'Surface::ReflectionLines': ReflectionLinesNode,
  'Surface::IsocurveExtract': IsocurveExtractNode,
  'Surface::SectionCurves': SectionCurvesNode,
  'Surface::ProjectCurve': ProjectCurveNode,
  'Surface::IntersectCurves': IntersectCurvesNode,
  'Surface::CurveOnSurface': CurveOnSurfaceNode,
  'Surface::GeodesicCurve': GeodesicCurveNode,
  'Surface::IsoparametricCurve': IsoparametricCurveNode,
  'Mesh::Tessellate': TessellateNode,
  'Mesh::AdaptiveTessellation': AdaptiveTessellationNode,
  'Mesh::RemeshUniform': RemeshUniformNode,
  'Mesh::QuadMesh': QuadMeshNode,
  'Mesh::VoxelMesh': VoxelMeshNode,
  'Mesh::RepairMesh': RepairMeshNode,
  'Mesh::SimplifyMesh': SimplifyMeshNode,
  'Mesh::FillHoles': FillHolesNode,
  'Mesh::SmoothMesh': SmoothMeshNode,
  'Mesh::DecimateMesh': DecimateMeshNode,
  'Mesh::SubdivideMesh': SubdivideMeshNode,
  'Mesh::MeshBoolean': MeshBooleanNode,
  'Mesh::MeshOffset': MeshOffsetNode,
  'Mesh::ImportSTL': ImportSTLNode,
  'Mesh::ExportSTL': ExportSTLNode,
  'Mesh::ImportOBJ': ImportOBJNode,
  'Mesh::ExportOBJ': ExportOBJNode,
  'Mesh::ImportPLY': ImportPLYNode,
  'Mesh::Export3MF': Export3MFNode,
  'Mesh::MeshToShape': MeshToShapeNode,
  'IO::ImportSTEP': ImportSTEPNode,
  'IO::ExportSTEP': ExportSTEPNode,
  'IO::ImportIGES': ImportIGESNode,
  'IO::ExportIGES': ExportIGESNode,
  'IO::ImportBREP': ImportBREPNode,
  'IO::ExportBREP': ExportBREPNode,
  'IO::ImportParasolid': ImportParasolidNode,
  'IO::ImportACIS': ImportACISNode,
  'IO::ImportDXF': ImportDXFNode,
  'IO::ExportDXF': ExportDXFNode,
  'IO::ExportSVG': ExportSVGNode,
  'IO::ImportGLTF': ImportGLTFNode,
  'IO::ExportGLTF': ExportGLTFNode,
  'IO::ImportJSON': ImportJSONNode,
  'IO::ExportJSON': ExportJSONNode,
  'Specialized::Text3D': Text3DNode,
  'Specialized::Engrave': EngraveNode,
  'Specialized::Emboss': EmbossNode,
  'Specialized::SerialNumber': SerialNumberNode,
  'Specialized::Barcode': BarcodeNode,
  'Specialized::LatticeStructure': LatticeStructureNode,
  'Specialized::TPMS': TPMSNode,
  'Specialized::VoronoiLattice': VoronoiLatticeNode,
  'Specialized::GradedLattice': GradedLatticeNode,
  'Specialized::ConformLattice': ConformLatticeNode,
  'Specialized::HoneycombStructure': HoneycombStructureNode,
  'Specialized::TopologyOptimize': TopologyOptimizeNode,
  'Specialized::ShapeOptimize': ShapeOptimizeNode,
  'Specialized::GenerativeDesign': GenerativeDesignNode,
  'Specialized::LightweightStructure': LightweightStructureNode,
  'Specialized::StressRelief': StressReliefNode,
  'Specialized::PackingOptimize': PackingOptimizeNode,
  'Specialized::MetaBalls': MetaBallsNode,
  'Specialized::SubdivisionSurface': SubdivisionSurfaceNode,
  'Specialized::FractalGeometry': FractalGeometryNode,
  'Specialized::ReactionDiffusion': ReactionDiffusionNode,
  'Specialized::BiomimeticStructure': BiomimeticStructureNode,
  'Simulation::MeshForFEA': MeshForFEANode,
  'Simulation::ApplyLoads': ApplyLoadsNode,
  'Simulation::ApplyConstraints': ApplyConstraintsNode,
  'Simulation::MaterialAssign': MaterialAssignNode,
  'Simulation::ExportFEA': ExportFEANode,
  'Simulation::FluidDomain': FluidDomainNode,
  'Simulation::BoundaryLayers': BoundaryLayersNode,
  'Simulation::InletOutlet': InletOutletNode,
  'Simulation::FluidProperties': FluidPropertiesNode,
  'Simulation::ExportCFD': ExportCFDNode,
  'Simulation::JointDefinition': JointDefinitionNode,
  'Simulation::MotionDriver': MotionDriverNode,
  'Simulation::CollisionDetection': CollisionDetectionNode,
  'Simulation::ForwardKinematics': ForwardKinematicsNode,
  'Simulation::InverseKinematics': InverseKinematicsNode,
  'Math::Add': AddNode,
  'Math::Subtract': SubtractNode,
  'Math::Multiply': MultiplyNode,
  'Math::Divide': DivideNode,
  'Math::Power': PowerNode,
  'Math::Modulo': ModuloNode,
  'Math::Absolute': AbsoluteNode,
  'Math::Negate': NegateNode,
  'Math::SquareRoot': SquareRootNode,
  'Math::Factorial': FactorialNode,
  'Math::Sine': SineNode,
  'Math::Cosine': CosineNode,
  'Math::Tangent': TangentNode,
  'Math::ArcSine': ArcSineNode,
  'Math::ArcCosine': ArcCosineNode,
  'Math::ArcTangent': ArcTangentNode,
  'Math::ArcTangent2': ArcTangent2Node,
  'Math::HyperbolicSine': HyperbolicSineNode,
  'Math::HyperbolicCosine': HyperbolicCosineNode,
  'Math::HyperbolicTangent': HyperbolicTangentNode,
  'Math::NaturalLog': NaturalLogNode,
  'Math::Log10': Log10Node,
  'Math::LogBase': LogBaseNode,
  'Math::Exponential': ExponentialNode,
  'Math::Exp10': Exp10Node,
  'Math::Round': RoundNode,
  'Math::Floor': FloorNode,
  'Math::Ceiling': CeilingNode,
  'Math::Truncate': TruncateNode,
  'Math::RoundToDecimal': RoundToDecimalNode,
  'Math::Min': MinNode,
  'Math::Max': MaxNode,
  'Math::Clamp': ClampNode,
  'Math::Sign': SignNode,
  'Math::IsEqual': IsEqualNode,
  'Math::Average': AverageNode,
  'Math::Median': MedianNode,
  'Math::Mode': ModeNode,
  'Math::StandardDeviation': StandardDeviationNode,
  'Math::Variance': VarianceNode,
  'Math::Sum': SumNode,
  'Math::Product': ProductNode,
  'Math::Range': RangeNode,
  'Math::Percentile': PercentileNode,
  'Math::Correlation': CorrelationNode,
  'Math::Random': RandomNode,
  'Math::RandomRange': RandomRangeNode,
  'Math::RandomInteger': RandomIntegerNode,
  'Math::RandomNormal': RandomNormalNode,
  'Math::RandomPoisson': RandomPoissonNode,
  'Math::RandomExponential': RandomExponentialNode,
  'Math::RandomChoice': RandomChoiceNode,
  'Math::Shuffle': ShuffleNode,
  'Math::PerlinNoise': PerlinNoiseNode,
  'Math::SimplexNoise': SimplexNoiseNode,
  'Math::Lerp': LerpNode,
  'Math::InverseLerp': InverseLerpNode,
  'Math::Remap': RemapNode,
  'Math::SmoothStep': SmoothStepNode,
  'Math::SmootherStep': SmootherStepNode,
  'Math::CubicInterp': CubicInterpNode,
  'Math::HermiteInterp': HermiteInterpNode,
  'Math::BezierInterp': BezierInterpNode,
  'Math::EaseIn': EaseInNode,
  'Math::EaseOut': EaseOutNode,
  'Math::EaseInOut': EaseInOutNode,
  'Math::SpringInterp': SpringInterpNode,
  'Math::ComplexNumber': ComplexNumberNode,
  'Math::ComplexAdd': ComplexAddNode,
  'Math::ComplexMultiply': ComplexMultiplyNode,
  'Math::ComplexConjugate': ComplexConjugateNode,
  'Math::ComplexMagnitude': ComplexMagnitudeNode,
  'Math::ComplexPhase': ComplexPhaseNode,
  'Math::MatrixMultiply': MatrixMultiplyNode,
  'Math::MatrixInverse': MatrixInverseNode,
  'Math::MatrixDeterminant': MatrixDeterminantNode,
  'Math::MatrixTranspose': MatrixTransposeNode,
  'Data::ListLength': ListLengthNode,
  'Data::ListItem': ListItemNode,
  'Data::ListSlice': ListSliceNode,
  'Data::ListReverse': ListReverseNode,
  'Data::ListSort': ListSortNode,
  'Data::ListShuffle': ListShuffleNode,
  'Data::ListShift': ListShiftNode,
  'Data::ListInsert': ListInsertNode,
  'Data::ListRemove': ListRemoveNode,
  'Data::ListReplace': ListReplaceNode,
  'Data::ListAppend': ListAppendNode,
  'Data::ListPrepend': ListPrependNode,
  'Data::ListJoin': ListJoinNode,
  'Data::ListSplit': ListSplitNode,
  'Data::ListPartition': ListPartitionNode,
  'Data::ListFlatten': ListFlattenNode,
  'Data::ListUnique': ListUniqueNode,
  'Data::ListContains': ListContainsNode,
  'Data::ListFind': ListFindNode,
  'Data::ListFilter': ListFilterNode,
  'Data::SetUnion': SetUnionNode,
  'Data::SetIntersection': SetIntersectionNode,
  'Data::SetDifference': SetDifferenceNode,
  'Data::SetSymmetricDifference': SetSymmetricDifferenceNode,
  'Data::SetSubset': SetSubsetNode,
  'Data::SetCartesianProduct': SetCartesianProductNode,
  'Data::SetPowerSet': SetPowerSetNode,
  'Data::SetCombinations': SetCombinationsNode,
  'Data::SetPermutations': SetPermutationsNode,
  'Data::SetPartitions': SetPartitionsNode,
  'Data::TreeBranch': TreeBranchNode,
  'Data::TreePaths': TreePathsNode,
  'Data::TreeGraft': TreeGraftNode,
  'Data::TreeFlatten': TreeFlattenNode,
  'Data::TreeSimplify': TreeSimplifyNode,
  'Data::TreePrune': TreePruneNode,
  'Data::TreeMerge': TreeMergeNode,
  'Data::TreeExplode': TreeExplodeNode,
  'Data::TreeShift': TreeShiftNode,
  'Data::TreeStatistics': TreeStatisticsNode,
  'Data::StringConcat': StringConcatNode,
  'Data::StringSplit': StringSplitNode,
  'Data::StringReplace': StringReplaceNode,
  'Data::StringFormat': StringFormatNode,
  'Data::StringCase': StringCaseNode,
  'Data::StringTrim': StringTrimNode,
  'Data::StringLength': StringLengthNode,
  'Data::StringSubstring': StringSubstringNode,
  'Data::StringContains': StringContainsNode,
  'Data::StringMatch': StringMatchNode,
  'Data::ToString': ToStringNode,
  'Data::ToNumber': ToNumberNode,
  'Data::ToBoolean': ToBooleanNode,
  'Data::ToJSON': ToJSONNode,
  'Data::FromJSON': FromJSONNode,
  'Data::ToCSV': ToCSVNode,
  'Data::FromCSV': FromCSVNode,
  'Data::ToBase64': ToBase64Node,
  'Data::FromBase64': FromBase64Node,
  'Data::TypeOf': TypeOfNode,
  'Field::LinearField': LinearFieldNode,
  'Field::RadialField': RadialFieldNode,
  'Field::SphericalField': SphericalFieldNode,
  'Field::CylindricalField': CylindricalFieldNode,
  'Field::NoiseField': NoiseFieldNode,
  'Field::SineField': SineFieldNode,
  'Field::VectorField': VectorFieldNode,
  'Field::ImageField': ImageFieldNode,
  'Field::DistanceField': DistanceFieldNode,
  'Field::ChargeField': ChargeFieldNode,
  'Field::PointAttractor': PointAttractorNode,
  'Field::CurveAttractor': CurveAttractorNode,
  'Field::SurfaceAttractor': SurfaceAttractorNode,
  'Field::MeshAttractor': MeshAttractorNode,
  'Field::SpinAttractor': SpinAttractorNode,
  'Field::DirectionalAttractor': DirectionalAttractorNode,
  'Field::TwistAttractor': TwistAttractorNode,
  'Field::VortexAttractor': VortexAttractorNode,
  'Field::GravityAttractor': GravityAttractorNode,
  'Field::FlowAttractor': FlowAttractorNode,
  'Field::FieldAdd': FieldAddNode,
  'Field::FieldSubtract': FieldSubtractNode,
  'Field::FieldMultiply': FieldMultiplyNode,
  'Field::FieldDivide': FieldDivideNode,
  'Field::FieldMin': FieldMinNode,
  'Field::FieldMax': FieldMaxNode,
  'Field::FieldBlend': FieldBlendNode,
  'Field::FieldRemap': FieldRemapNode,
  'Field::FieldClamp': FieldClampNode,
  'Field::FieldInvert': FieldInvertNode,
  'Field::FieldGradient': FieldGradientNode,
  'Field::FieldDivergence': FieldDivergenceNode,
  'Field::FieldCurl': FieldCurlNode,
  'Field::FieldLaplacian': FieldLaplacianNode,
  'Field::FieldSmooth': FieldSmoothNode,
  'Field::SampleField': SampleFieldNode,
  'Field::FieldLine': FieldLineNode,
  'Field::IsoContour': IsoContourNode,
  'Field::IsoSurface': IsoSurfaceNode,
  'Field::FieldGrid': FieldGridNode,
  'Field::FieldDeform': FieldDeformNode,
  'Field::FieldDisplace': FieldDisplaceNode,
  'Field::FieldScale': FieldScaleNode,
  'Field::FieldRotate': FieldRotateNode,
  'Field::FieldColor': FieldColorNode,
  'Fields::FieldColorMap': FieldColorMapNode,
  'Fields::FieldVectorArrows': FieldVectorArrowsNode,
  'Fields::FieldStreamLines': FieldStreamLinesNode,
  'Fields::FieldHeatMap': FieldHeatMapNode,
  'Fields::FieldVolume': FieldVolumeNode,
  'Fields::FieldMinMax': FieldMinMaxNode,
  'Fields::FieldAverage': FieldAverageNode,
  'Fields::FieldCriticalPoints': FieldCriticalPointsNode,
  'Fields::FieldDivergenceAnalysis': FieldDivergenceAnalysisNode,
  'Fields::FieldCurlAnalysis': FieldCurlAnalysisNode,
  'Fields::FieldFlux': FieldFluxNode,
  'Fields::FieldCirculation': FieldCirculationNode,
  'Fields::FieldPotential': FieldPotentialNode,
  'Fields::FieldHistogram': FieldHistogramNode,
  'Fields::FieldCorrelation': FieldCorrelationNode,
  'Fields::FieldMorphing': FieldMorphingNode,
  'Fields::FieldWarp': FieldWarpNode,
  'Fields::FieldConvolution': FieldConvolutionNode,
  'Fields::FieldFourier': FieldFourierNode,
  'Fields::FieldOptimize': FieldOptimizeNode,
  'Patterns::Voronoi2D': Voronoi2DNode,
  'Patterns::Voronoi3D': Voronoi3DNode,
  'Patterns::WeightedVoronoi': WeightedVoronoiNode,
  'Patterns::CentroidalVoronoi': CentroidalVoronoiNode,
  'Patterns::VoronoiOnSurface': VoronoiOnSurfaceNode,
  'Patterns::Delaunay2D': Delaunay2DNode,
  'Patterns::Delaunay3D': Delaunay3DNode,
  'Patterns::ConstrainedDelaunay': ConstrainedDelaunayNode,
  'Patterns::AlphaShape': AlphaShapeNode,
  'Patterns::VoronoiFracture': VoronoiFractureNode,
  'Patterns::VoronoiGrowth': VoronoiGrowthNode,
  'Patterns::DelaunayMesh': DelaunayMeshNode,
  'Patterns::VoronoiSkeleton': VoronoiSkeletonNode,
  'Patterns::VoronoiOffset': VoronoiOffsetNode,
  'Patterns::ConvexHull': ConvexHullNode,
  'Patterns::IslamicStar': IslamicStarNode,
  'Patterns::GirihTiling': GirihTilingNode,
  'Patterns::Arabesque': ArabesqueNode,
  'Patterns::MoorishPattern': MoorishPatternNode,
  'Patterns::IslamicGrid': IslamicGridNode,
  'Patterns::CelticKnot': CelticKnotNode,
  'Patterns::CelticBraid': CelticBraidNode,
  'Patterns::PenroseTiling': PenroseTilingNode,
  'Patterns::TruchetTiles': TruchetTilesNode,
  'Patterns::SpiralPattern': SpiralPatternNode,
  'Patterns::MandalaPattern': MandalaPatternNode,
  'Patterns::PolygonalTessellation': PolygonalTessellationNode,
  'Patterns::CirclePacking': CirclePackingNode,
  'Patterns::HyperbolicTiling': HyperbolicTilingNode,
  'Patterns::GeodesicPattern': GeodesicPatternNode,
  'Patterns::Muqarnas': MuqarnasNode,
  'Patterns::QuasiCrystal': QuasiCrystalNode,
  'Patterns::MinimalSurface': MinimalSurfaceNode,
  'Patterns::ReactionDiffusion': ReactionDiffusionNode,
  'Patterns::ParquetDeformation': ParquetDeformationNode,
  'Patterns::KochSnowflake': KochSnowflakeNode,
  'Patterns::SierpinskiTriangle': SierpinskiTriangleNode,
  'Patterns::MengerSponge': MengerSpongeNode,
  'Patterns::JuliaSet': JuliaSetNode,
  'Patterns::MandelbrotSet': MandelbrotSetNode,
  'Patterns::LSystem2D': LSystem2DNode,
  'Patterns::LSystem3D': LSystem3DNode,
  'Patterns::TreeGenerator': TreeGeneratorNode,
  'Patterns::DragonCurve': DragonCurveNode,
  'Patterns::HilbertCurve': HilbertCurveNode,
  'Patterns::PeanoCurve': PeanoCurveNode,
  'Patterns::CantorSet': CantorSetNode,
  'Patterns::PlantGrowth': PlantGrowthNode,
  'Patterns::BarnsleyFern': BarnsleyFernNode,
  'Patterns::ApollonianGasket': ApollonianGasketNode,
  'Patterns::RectanglePacking': RectanglePackingNode,
  'Patterns::SpherePacking': SpherePackingNode,
  'Patterns::PolygonPacking': PolygonPackingNode,
  'Patterns::CubicLattice': CubicLatticeNode,
  'Patterns::OctetLattice': OctetLatticeNode,
  'Patterns::DiamondLattice': DiamondLatticeNode,
  'Patterns::KelvinLattice': KelvinLatticeNode,
  'Patterns::TPMSLattice': TPMSLatticeNode,
  'Patterns::BrickPattern': BrickPatternNode,
  'Patterns::ParquetPattern': ParquetPatternNode,
  'Patterns::WeavePattern': WeavePatternNode,
  'Patterns::HoneycombPattern': HoneycombPatternNode,
  'Patterns::FoamStructure': FoamStructureNode,
  'Patterns::CellularAutomata': CellularAutomataNode,
  'Patterns::ConwayLife': ConwayLifeNode,
  'Patterns::PoissonDisk': PoissonDiskNode,
  'Patterns::BlueNoise': BlueNoiseNode,
  'Patterns::JitteredGrid': JitteredGridNode,
  'Patterns::MinimumSpanningTree': MinimumSpanningTreeNode,
  'Patterns::RelativeNeighborhood': RelativeNeighborhoodNode,
  'Patterns::BinaryTree': BinaryTreeNode,
  'Patterns::MazeGenerator': MazeGeneratorNode,
  'Patterns::SubdivisionSurface': SubdivisionSurfaceNode,
  'Patterns::FlockingPattern': FlockingPatternNode,
  'Patterns::DiffusionLimitedAggregation': DiffusionLimitedAggregationNode,
  'Patterns::GrammarShapes': GrammarShapesNode,
  'Patterns::WaveFunctionCollapse': WaveFunctionCollapseNode,
  'Patterns::MarkovChain': MarkovChainNode,
  'Patterns::GeneticAlgorithm': GeneticAlgorithmNode,
  'Patterns::NeuralPattern': NeuralPatternNode,
  'Patterns::StrangeAttractor': StrangeAttractorNode,
  'Patterns::PhyllotaxisPattern': PhyllotaxisPatternNode,
  'Patterns::TuringPattern': TuringPatternNode,
  'Patterns::NoisePattern': NoisePatternNode,
  'Patterns::PackingCircles': PackingCirclesNode,
  'Patterns::KMeansClustering': KMeansClusteringNode,
  'Patterns::ContextFreeArt': ContextFreeArtNode,
  'Patterns::ProceduralTexture': ProceduralTextureNode,
  'Patterns::GraphLayout': GraphLayoutNode,
  'Patterns::ShortestPath': ShortestPathNode,
  'Fabrication::SupportGeneration': SupportGenerationNode,
  'Fabrication::PrintOrientation': PrintOrientationNode,
  'Fabrication::SliceModel': SliceModelNode,
  'Fabrication::BridgeDetection': BridgeDetectionNode,
  'Fabrication::WallThickness': WallThicknessNode,
  'Fabrication::PrintTimeEstimate': PrintTimeEstimateNode,
  'Fabrication::RaftGeneration': RaftGenerationNode,
  'Fabrication::BrimGeneration': BrimGenerationNode,
  'Fabrication::SeamOptimization': SeamOptimizationNode,
  'Fabrication::InfillOptimization': InfillOptimizationNode,
  'Fabrication::CoolingAnalysis': CoolingAnalysisNode,
  'Fabrication::RetractionOptimization': RetractionOptimizationNode,
  'Fabrication::VaseMode': VaseModeNode,
  'Fabrication::MultiMaterialSetup': MultiMaterialSetupNode,
  'Fabrication::TreeSupports': TreeSupportsNode,
  'Fabrication::IroningPass': IroningPassNode,
  'Fabrication::FuzzySkinn': FuzzySkinnNode,
  'Fabrication::CoastingSetup': CoastingSetupNode,
  'Fabrication::WipeTower': WipeTowerNode,
  'Fabrication::AdaptiveLayerHeight': AdaptiveLayerHeightNode,
  'Fabrication::PerimeterGenerator': PerimeterGeneratorNode,
  'Fabrication::GCodePostProcessor': GCodePostProcessorNode,
  'Fabrication::NonPlanarSlicing': NonPlanarSlicingNode,
  'Fabrication::ConicalSlicing': ConicalSlicingNode,
  'Fabrication::SolubleSupportInterface': SolubleSupportInterfaceNode,
  'Fabrication::ToolpathGeneration': ToolpathGenerationNode,
  'Fabrication::PocketingStrategy': PocketingStrategyNode,
  'Fabrication::ContouringToolpath': ContouringToolpathNode,
  'Fabrication::DrillingOperation': DrillingOperationNode,
  'Fabrication::ThreadMilling': ThreadMillingNode,
  'Fabrication::AdaptiveClearing': AdaptiveClearingNode,
  'Fabrication::TrochoidalMilling': TrochoidalMillingNode,
  'Fabrication::RestMachining': RestMachiningNode,
  'Fabrication::ToolCompensation': ToolCompensationNode,
  'Fabrication::HelicalEntry': HelicalEntryNode,
  'Fabrication::RampEntry': RampEntryNode,
  'Fabrication::HighSpeedMachining': HighSpeedMachiningNode,
  'Fabrication::ScallopHeight': ScallopHeightNode,
  'Fabrication::CollisionDetection': CollisionDetectionNode,
  'Fabrication::FeedsAndSpeeds': FeedsAndSpeedsNode,
  'Fabrication::FiveAxisPositioning': FiveAxisPositioningNode,
  'Fabrication::SwarmMilling': SwarmMillingNode,
  'Fabrication::ToolLibrary': ToolLibraryNode,
  'Fabrication::WorkCoordinate': WorkCoordinateNode,
  'Fabrication::PostProcessor': PostProcessorNode,
  'Fabrication::ChipEvacuation': ChipEvacuationNode,
  'Fabrication::CutterEngagement': CutterEngagementNode,
  'Fabrication::ToolWear': ToolWearNode,
  'Fabrication::SetupSheets': SetupSheetsNode,
  'Fabrication::ProbeRoutine': ProbeRoutineNode,
  'Fabrication::LaserPath': LaserPathNode,
  'Fabrication::TabsAndSlots': TabsAndSlotsNode,
  'Fabrication::LivingHinge': LivingHingeNode,
  'Fabrication::KerfBending': KerfBendingNode,
  'Fabrication::PowerMapping': PowerMappingNode,
  'Fabrication::EngraveRaster': EngraveRasterNode,
  'Fabrication::VectorEngrave': VectorEngraveNode,
  'Fabrication::NestingOptimization': NestingOptimizationNode,
  'Fabrication::CutOrderOptimization': CutOrderOptimizationNode,
  'Fabrication::LeadInOut': LeadInOutNode,
  'Fabrication::BridgeGeneration': BridgeGenerationNode,
  'Fabrication::FocusCompensation': FocusCompensationNode,
  'Fabrication::HatchFill': HatchFillNode,
  'Fabrication::TextEngraving': TextEngravingNode,
  'Fabrication::MaterialDatabase': MaterialDatabaseNode,
  'Fabrication::LayerSeparation': LayerSeparationNode,
  'Fabrication::MultiplePasses': MultiplePassesNode,
  'Fabrication::CleanupPaths': CleanupPathsNode,
  'Fabrication::PierceOptimization': PierceOptimizationNode,
  'Fabrication::MicroJoints': MicroJointsNode,
  'Fabrication::CutQuality': CutQualityNode,
  'Fabrication::RotaryAttachment': RotaryAttachmentNode,
  'Fabrication::AirAssist': AirAssistNode,
  'Fabrication::SafetyZones': SafetyZonesNode,
  'Fabrication::JobTimeEstimate': JobTimeEstimateNode,
  'Fabrication::RobotKinematics': RobotKinematicsNode,
  'Fabrication::PathPlanning': PathPlanningNode,
  'Fabrication::CollisionAvoidance': CollisionAvoidanceNode,
  'Fabrication::EndEffectorSetup': EndEffectorSetupNode,
  'Fabrication::WorkCellSetup': WorkCellSetupNode,
  'Fabrication::TrajectoryOptimization': TrajectoryOptimizationNode,
  'Fabrication::SingularityAvoidance': SingularityAvoidanceNode,
  'Fabrication::RobotCalibration': RobotCalibrationNode,
  'Fabrication::ForceControl': ForceControlNode,
  'Fabrication::WeldingPath': WeldingPathNode,
  'Fabrication::PickAndPlace': PickAndPlaceNode,
  'Fabrication::PalletizingPattern': PalletizingPatternNode,
  'Fabrication::RoboticMilling': RoboticMillingNode,
  'Fabrication::SprayPainting': SprayPaintingNode,
  'Fabrication::AdditiveManufacturing': AdditiveManufacturingNode,
  'Fabrication::VisionGuidance': VisionGuidanceNode,
  'Fabrication::MultiRobotCoordination': MultiRobotCoordinationNode,
  'Fabrication::ConveyorTracking': ConveyorTrackingNode,
  'Fabrication::SafetyZoneSetup': SafetyZoneSetupNode,
  'Fabrication::RobotSimulation': RobotSimulationNode,
  'Fabrication::PostProcessorRobot': PostProcessorRobotNode,
  'Fabrication::ReachAnalysis': ReachAnalysisNode,
  'Fabrication::JointLimitAvoidance': JointLimitAvoidanceNode,
  'Fabrication::ToolChangerSetup': ToolChangerSetupNode,
  'Fabrication::RobotMaintenance': RobotMaintenanceNode,
  'Architecture::StraightWall': StraightWallNode,
  'Architecture::CurvedWall': CurvedWallNode,
  'Architecture::CompoundWall': CompoundWallNode,
  'Architecture::CurtainWall': CurtainWallNode,
  'Architecture::WallOpening': WallOpeningNode,
  'Architecture::WallJoin': WallJoinNode,
  'Architecture::RetainingWall': RetainingWallNode,
  'Architecture::StudWall': StudWallNode,
  'Architecture::InsulatedWall': InsulatedWallNode,
  'Architecture::TiltUpPanel': TiltUpPanelNode,
  'Architecture::ParapetWall': ParapetWallNode,
  'Architecture::FireWall': FireWallNode,
  'Architecture::MovablePartition': MovablePartitionNode,
  'Architecture::SoundproofWall': SoundproofWallNode,
  'Architecture::GreenWall': GreenWallNode,
  'Architecture::DoubleSkinnedFacade': DoubleSkinnedFacadeNode,
  'Architecture::RainScreen': RainScreenNode,
  'Architecture::ShearWall': ShearWallNode,
  'Architecture::FoundationWall': FoundationWallNode,
  'Architecture::HistoricWallRestoration': HistoricWallRestorationNode,
  'Architecture::SlabOnGrade': SlabOnGradeNode,
  'Architecture::CompositeFloor': CompositeFloorNode,
  'Architecture::RaisedFloor': RaisedFloorNode,
  'Architecture::WoodJoistFloor': WoodJoistFloorNode,
  'Architecture::PostTensionedSlab': PostTensionedSlabNode,
  'Architecture::SuspendedCeiling': SuspendedCeilingNode,
  'Architecture::CofferedCeiling': CofferedCeilingNode,
  'Architecture::VaultedCeiling': VaultedCeilingNode,
  'Architecture::MezzanineFloor': MezzanineFloorNode,
  'Architecture::EpoxyFloor': EpoxyFloorNode,
  'Architecture::RadiantFloor': RadiantFloorNode,
  'Architecture::AcousticCeiling': AcousticCeilingNode,
  'Architecture::FloorDrainage': FloorDrainageNode,
  'Architecture::StretchCeiling': StretchCeilingNode,
  'Architecture::GreenRoof': GreenRoofNode,
  'Architecture::FloorExpansionJoint': FloorExpansionJointNode,
  'Architecture::SkyLight': SkyLightNode,
  'Architecture::FloorFinish': FloorFinishNode,
  'Architecture::CeilingBeam': CeilingBeamNode,
  'Architecture::PedestalPavers': PedestalPaversNode,
  'Architecture::StraightStair': StraightStairNode,
  'Architecture::LShapedStair': LShapedStairNode,
  'Architecture::UShapedStair': UShapedStairNode,
  'Architecture::SpiralStair': SpiralStairNode,
  'Architecture::HelicalStair': HelicalStairNode,
  'Architecture::WinderStair': WinderStairNode,
  'Architecture::StraightRamp': StraightRampNode,
  'Architecture::SwitchbackRamp': SwitchbackRampNode,
  'Architecture::HelicalRamp': HelicalRampNode,
  'Architecture::StairHandrail': StairHandrailNode,
  'Architecture::StairBalustrade': StairBalustradeNode,
  'Architecture::StairNosing': StairNosingNode,
  'Architecture::StairStringer': StairStringerNode,
  'Architecture::EscapeStair': EscapeStairNode,
  'Architecture::MonumentalStair': MonumentalStairNode,
  'Architecture::FloatingStair': FloatingStairNode,
  'Architecture::LoadingDock': LoadingDockNode,
  'Architecture::CurbRamp': CurbRampNode,
  'Architecture::AlternatingTreadStair': AlternatingTreadStairNode,
  'Architecture::VehicleRamp': VehicleRampNode,
  'Architecture::SingleDoor': SingleDoorNode,
  'Architecture::DoubleDoor': DoubleDoorNode,
  'Architecture::SlidingDoor': SlidingDoorNode,
  'Architecture::RevolvingDoor': RevolvingDoorNode,
  'Architecture::FoldingDoor': FoldingDoorNode,
  'Architecture::RollupDoor': RollupDoorNode,
  'Architecture::CasementWindow': CasementWindowNode,
  'Architecture::SlidingWindow': SlidingWindowNode,
  'Architecture::DoubleHungWindow': DoubleHungWindowNode,
  'Architecture::AwningWindow': AwningWindowNode,
  'Architecture::BayWindow': BayWindowNode,
  'Architecture::BowWindow': BowWindowNode,
  'Architecture::ClerestroyWindow': ClerestroyWindowNode,
  'Architecture::FireDoor': FireDoorNode,
  'Architecture::SecurityDoor': SecurityDoorNode,
  'Architecture::StainedGlassWindow': StainedGlassWindowNode,
  'Architecture::OverheadDoor': OverheadDoorNode,
  'Architecture::JalousieWindow': JalousieWindowNode,
  'Architecture::DutchDoor': DutchDoorNode,
  'Architecture::GothicWindow': GothicWindowNode,
  'MechanicalEngineering::SpurGear': SpurGearNode,
  'MechanicalEngineering::HelicalGear': HelicalGearNode,
  'MechanicalEngineering::BevelGear': BevelGearNode,
  'MechanicalEngineering::WormGear': WormGearNode,
  'MechanicalEngineering::WormShaft': WormShaftNode,
  'MechanicalEngineering::RackGear': RackGearNode,
  'MechanicalEngineering::InternalGear': InternalGearNode,
  'MechanicalEngineering::PlanetaryGearSet': PlanetaryGearSetNode,
  'MechanicalEngineering::TimingPulley': TimingPulleyNode,
  'MechanicalEngineering::ChainSprocket': ChainSprocketNode,
  'MechanicalEngineering::CVTDisc': CVTDiscNode,
  'MechanicalEngineering::DifferentialGear': DifferentialGearNode,
  'MechanicalEngineering::BallBearing': BallBearingNode,
  'MechanicalEngineering::RollerBearing': RollerBearingNode,
  'MechanicalEngineering::ThrustBearing': ThrustBearingNode,
  'MechanicalEngineering::NeedleBearing': NeedleBearingNode,
  'MechanicalEngineering::LinearBearing': LinearBearingNode,
  'MechanicalEngineering::PillowBlock': PillowBlockNode,
  'MechanicalEngineering::FlangeBearing': FlangeBearingNode,
  'MechanicalEngineering::BronzeBushing': BronzeBushingNode,
  'MechanicalEngineering::SphericalBearing': SphericalBearingNode,
  'MechanicalEngineering::AirBearing': AirBearingNode,
  'MechanicalEngineering::HexBolt': HexBoltNode,
  'MechanicalEngineering::SocketHeadCapScrew': SocketHeadCapScrewNode,
  'MechanicalEngineering::HexNut': HexNutNode,
  'MechanicalEngineering::Washer': WasherNode,
  'MechanicalEngineering::ThreadInsert': ThreadInsertNode,
  'MechanicalEngineering::Rivet': RivetNode,
  'MechanicalEngineering::ClampingCollar': ClampingCollarNode,
  'MechanicalEngineering::Dowel': DowelNode,
  'MechanicalEngineering::RetainingRing': RetainingRingNode,
  'MechanicalEngineering::KeywayJoint': KeywayJointNode,
  'MechanicalEngineering::CompressionSpring': CompressionSpringNode,
  'MechanicalEngineering::ExtensionSpring': ExtensionSpringNode,
  'MechanicalEngineering::TorsionSpring': TorsionSpringNode,
  'MechanicalEngineering::LeafSpring': LeafSpringNode,
  'MechanicalEngineering::GasSpring': GasSpringNode,
  'MechanicalEngineering::CamProfile': CamProfileNode,
  'MechanicalEngineering::LinkageMechanism': LinkageMechanismNode,
  'MechanicalEngineering::RatchetMechanism': RatchetMechanismNode,
  'MechanicalEngineering::ClutchMechanism': ClutchMechanismNode,
  'MechanicalEngineering::UniversalJoint': UniversalJointNode,
  'MechanicalEngineering::SteppedShaft': SteppedShaftNode,
  'MechanicalEngineering::SplinedShaft': SplinedShaftNode,
  'MechanicalEngineering::FlexibleShaft': FlexibleShaftNode,
  'MechanicalEngineering::HollowShaft': HollowShaftNode,
  'MechanicalEngineering::RigidCoupling': RigidCouplingNode,
  'MechanicalEngineering::FlexibleCoupling': FlexibleCouplingNode,
  'MechanicalEngineering::OldhamCoupling': OldhamCouplingNode,
  'MechanicalEngineering::FluidCoupling': FluidCouplingNode,
  'MechanicalEngineering::PulleySystem': PulleySystemNode,
  'MechanicalEngineering::ChainDrive': ChainDriveNode,
  'Analysis::CurvatureComb': CurvatureCombNode,
  'Analysis::CurveLength': CurveLengthNode,
  'Analysis::CurveSmoothnessAnalysis': CurveSmoothnessAnalysisNode,
  'Analysis::CurveInflectionPoints': CurveInflectionPointsNode,
  'Analysis::CurveTorsion': CurveTorsionNode,
  'Analysis::CurveDerivatives': CurveDerivativesNode,
  'Analysis::CurveParameter': CurveParameterNode,
  'Analysis::CurveEndpoints': CurveEndpointsNode,
  'Analysis::CurveClosestPoint': CurveClosestPointNode,
  'Analysis::CurveExtremePoints': CurveExtremePointsNode,
  'Analysis::CurveAreaMoments': CurveAreaMomentsNode,
  'Analysis::CurveConvexHull': CurveConvexHullNode,
  'Analysis::CurveBoundingBox': CurveBoundingBoxNode,
  'Analysis::CurveSpiral': CurveSpiralNode,
  'Analysis::SurfaceCurvature': SurfaceCurvatureNode,
  'Analysis::SurfaceNormals': SurfaceNormalsNode,
  'Analysis::SurfaceArea': SurfaceAreaNode,
  'Analysis::SurfaceIsoCurves': SurfaceIsoCurvesNode,
  'Analysis::SurfaceParametrization': SurfaceParametrizationNode,
  'Analysis::SurfaceDerivatives': SurfaceDerivativesNode,
  'Analysis::SurfaceClosestPoint': SurfaceClosestPointNode,
  'Analysis::SurfaceBoundary': SurfaceBoundaryNode,
  'Analysis::SurfaceContinuity': SurfaceContinuityNode,
  'Analysis::SurfaceDeviation': SurfaceDeviationNode,
  'Analysis::SurfaceFlatness': SurfaceFlatnessNode,
  'Analysis::SurfaceRoughness': SurfaceRoughnessNode,
  'Analysis::CurveCurveIntersection': CurveCurveIntersectionNode,
  'Analysis::CurveSurfaceIntersection': CurveSurfaceIntersectionNode,
  'Analysis::SurfaceSurfaceIntersection': SurfaceSurfaceIntersectionNode,
  'Analysis::PlaneIntersection': PlaneIntersectionNode,
  'Analysis::RayIntersection': RayIntersectionNode,
  'Analysis::MinimumDistance': MinimumDistanceNode,
  'Analysis::ProximityAnalysis': ProximityAnalysisNode,
  'Analysis::ClearanceCheck': ClearanceCheckNode,
  'Analysis::CollisionDetection': CollisionDetectionNode,
  'Analysis::VisibilityAnalysis': VisibilityAnalysisNode,
  'Analysis::ShadowAnalysis': ShadowAnalysisNode,
  'Analysis::VolumeCalculation': VolumeCalculationNode,
  'Analysis::AngleMeasurement': AngleMeasurementNode,
  'Analysis::DistanceMeasurement': DistanceMeasurementNode,
  'Analysis::GeometryValidation': GeometryValidationNode,
  'Analysis::MeshQuality': MeshQualityNode,
  'Analysis::ToleranceAnalysis': ToleranceAnalysisNode,
  'Interoperability::STEPImport': STEPImportNode,
  'Interoperability::STEPExport': STEPExportNode,
  'Interoperability::IGESImport': IGESImportNode,
  'Interoperability::IGESExport': IGESExportNode,
  'Interoperability::STLImport': STLImportNode,
  'Interoperability::STLExport': STLExportNode,
  'Interoperability::OBJImport': OBJImportNode,
  'Interoperability::OBJExport': OBJExportNode,
  'Interoperability::PLYImport': PLYImportNode,
  'Interoperability::PLYExport': PLYExportNode,
  'Interoperability::ThreeMFImport': ThreeMFImportNode,
  'Interoperability::ThreeMFExport': ThreeMFExportNode,
  'Interoperability::DXFImport': DXFImportNode,
  'Interoperability::DXFExport': DXFExportNode,
  'Interoperability::SVGImport': SVGImportNode,
  'Interoperability::SVGExport': SVGExportNode,
  'Interoperability::SQLQuery': SQLQueryNode,
  'Interoperability::SQLInsert': SQLInsertNode,
  'Interoperability::HTTPRequest': HTTPRequestNode,
  'Interoperability::JSONParser': JSONParserNode,
  'Interoperability::JSONGenerator': JSONGeneratorNode,
  'Interoperability::S3Upload': S3UploadNode,
  'Interoperability::S3Download': S3DownloadNode,
  'Interoperability::EmailSender': EmailSenderNode,
  'Interoperability::SlackNotification': SlackNotificationNode,
  'Interoperability::CSVReader': CSVReaderNode,
  'Interoperability::CSVWriter': CSVWriterNode,
  'Interoperability::ExcelReader': ExcelReaderNode,
  'Interoperability::ExcelWriter': ExcelWriterNode,
  'Interoperability::GrasshopperExport': GrasshopperExportNode,
  'Interoperability::WebSocketClient': WebSocketClientNode,
  'Interoperability::MQTTPublisher': MQTTPublisherNode,
  'Interoperability::MQTTSubscriber': MQTTSubscriberNode,
  'Interoperability::SerialPort': SerialPortNode,
  'Interoperability::TCPClient': TCPClientNode,
  'Algorithmic::GeneticOptimizer': GeneticOptimizerNode,
  'Algorithmic::ParticleSwarmOptimizer': ParticleSwarmOptimizerNode,
  'Algorithmic::SimulatedAnnealing': SimulatedAnnealingNode,
  'Algorithmic::GradientDescent': GradientDescentNode,
  'Algorithmic::TopologyOptimizer': TopologyOptimizerNode,
  'Algorithmic::LinearRegression': LinearRegressionNode,
  'Algorithmic::KMeansClustering': KMeansClusteringNode,
  'Algorithmic::DecisionTree': DecisionTreeNode,
  'Algorithmic::NeuralNetwork': NeuralNetworkNode,
  'Algorithmic::SupportVectorMachine': SupportVectorMachineNode,
  'Algorithmic::ConvexHull3D': ConvexHull3DNode,
  'Algorithmic::AlphaShape': AlphaShapeNode,
  'Algorithmic::MinimumSpanningTree': MinimumSpanningTreeNode,
  'Algorithmic::ShortestPath': ShortestPathNode,
  'Algorithmic::VisibilityGraph': VisibilityGraphNode,
  'Algorithmic::MedialAxis': MedialAxisNode,
  'Algorithmic::DistanceField': DistanceFieldNode,
  'Algorithmic::MarchingCubes': MarchingCubesNode,
  'Algorithmic::SpacePartitioning': SpacePartitioningNode,
  'Algorithmic::VoxelGrid': VoxelGridNode,
  'Algorithmic::PointCloudProcessing': PointCloudProcessingNode,
  'Algorithmic::SurfaceReconstruction': SurfaceReconstructionNode,
  'Algorithmic::GeometrySimplification': GeometrySimplificationNode,
  'Algorithmic::GeometryMatching': GeometryMatchingNode,
  'Algorithmic::ShapeDescriptor': ShapeDescriptorNode,
};
