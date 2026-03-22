/**
 * Circle Basics & Properties Lesson
 * ==================================
 * GCE O-Level Elementary Mathematics
 *
 * Learning Objectives:
 * 1. Identify and name all parts of a circle
 * 2. Understand the relationship between radius and diameter
 *
 * Target: Secondary school students with varying abilities
 */

import { type ReactElement, useCallback } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineClozeInput,
    InlineClozeChoice,
    InlineTooltip,
    InlineLinkedHighlight,
    InlineSpotColor,
    InlineFeedback,
    Cartesian2D,
    VideoDisplay,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    clozePropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar, useSetVar } from "@/stores";

// ─────────────────────────────────────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────────────────────────────────────
const COLORS = {
    radius: '#62D0AD',      // Soft teal
    diameter: '#8E90F5',    // Soft indigo
    circumference: '#F7B23B', // Warm amber
    chord: '#AC8BF9',       // Soft violet
    arc: '#F8A0CD',         // Soft rose
    sector: '#62CCF9',      // Soft sky
    segment: '#F4A89A',     // Soft coral
    centre: '#22c55e',      // Green for centre point
};

// ─────────────────────────────────────────────────────────────────────────────
// REACTIVE VISUALIZATIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Interactive circle diagram showing radius and diameter */
function InteractiveCircleDiagram() {
    const radius = useVar('circleRadius', 3) as number;
    const setVar = useSetVar();
    const highlightId = useVar('circlePartHighlight', '') as string;

    const handlePointChange = useCallback((point: [number, number]) => {
        const newRadius = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
        const clampedRadius = Math.max(1, Math.min(5, newRadius));
        setVar('circleRadius', Math.round(clampedRadius * 2) / 2);
    }, [setVar]);

    // Calculate point position on circle at 45 degrees
    const angle = Math.PI / 4;
    const pointX = radius * Math.cos(angle);
    const pointY = radius * Math.sin(angle);

    return (
        <div className="relative">
            <Cartesian2D
                height={380}
                viewBox={{ x: [-6, 6], y: [-6, 6] }}
                showGrid={true}
                highlightVarName="circlePartHighlight"
                movablePoints={[
                    {
                        initial: [pointX, pointY],
                        color: COLORS.radius,
                        constrain: (p: [number, number]) => {
                            const r = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
                            const clampedR = Math.max(1, Math.min(5, r));
                            const theta = Math.atan2(p[1], p[0]);
                            return [clampedR * Math.cos(theta), clampedR * Math.sin(theta)];
                        },
                        onChange: handlePointChange,
                    },
                ]}
                dynamicPlots={([p]) => {
                    const currentRadius = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
                    return [
                        // The circle outline (circumference)
                        {
                            type: "circle" as const,
                            center: [0, 0] as [number, number],
                            radius: currentRadius,
                            color: highlightId === 'circumference' ? COLORS.circumference : '#64748b',
                            fillOpacity: 0.05,
                            highlightId: 'circumference',
                        },
                        // Centre point
                        {
                            type: "point" as const,
                            x: 0,
                            y: 0,
                            color: COLORS.centre,
                            highlightId: 'centre',
                        },
                        // Radius line (from centre to edge)
                        {
                            type: "segment" as const,
                            point1: [0, 0] as [number, number],
                            point2: p,
                            color: COLORS.radius,
                            weight: 3,
                            highlightId: 'radius',
                        },
                        // Diameter line (through centre)
                        {
                            type: "segment" as const,
                            point1: [-currentRadius, 0] as [number, number],
                            point2: [currentRadius, 0] as [number, number],
                            color: COLORS.diameter,
                            weight: 3,
                            style: "dashed" as const,
                            highlightId: 'diameter',
                        },
                    ];
                }}
            />
            <InteractionHintSequence
                hintKey="circle-diagram-drag"
                steps={[
                    {
                        gesture: "drag-circular",
                        label: "Drag the teal point to change the radius",
                        position: { x: "65%", y: "35%" },
                        dragPath: { type: "arc", startAngle: 45, endAngle: 90, radius: 35 },
                    },
                ]}
            />
        </div>
    );
}

/** Displays the current radius and calculated diameter values */
function RadiusDiameterValues() {
    const radius = useVar('circleRadius', 3) as number;
    const diameter = radius * 2;

    return (
        <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
                <span className="font-medium text-slate-700">Radius:</span>
                <span className="text-2xl font-bold" style={{ color: COLORS.radius }}>
                    {radius} cm
                </span>
            </div>
            <div className="flex items-center gap-3">
                <span className="font-medium text-slate-700">Diameter:</span>
                <span className="text-2xl font-bold" style={{ color: COLORS.diameter }}>
                    {diameter} cm
                </span>
            </div>
            <div className="text-sm text-slate-500 mt-2">
                Diameter = 2 × Radius
            </div>
        </div>
    );
}

/** Chord and Arc visualization */
function ChordArcDiagram() {
    return (
        <div className="relative">
            <Cartesian2D
                height={320}
                viewBox={{ x: [-5, 5], y: [-5, 5] }}
                showGrid={false}
                plots={[
                    // The circle
                    {
                        type: "circle",
                        center: [0, 0],
                        radius: 3.5,
                        color: '#64748b',
                        fillOpacity: 0.05,
                    },
                    // Centre point
                    {
                        type: "point",
                        x: 0,
                        y: 0,
                        color: COLORS.centre,
                    },
                    // Chord (straight line between two points on circle)
                    {
                        type: "segment",
                        point1: [-3, 1.8] as [number, number],
                        point2: [2.5, 2.5] as [number, number],
                        color: COLORS.chord,
                        weight: 4,
                    },
                ]}
            />
            {/* Arc label */}
            <div
                className="absolute text-sm font-semibold px-2 py-1 rounded"
                style={{
                    top: '15%',
                    right: '25%',
                    color: COLORS.arc,
                    backgroundColor: 'rgba(248, 160, 205, 0.15)',
                }}
            >
                Arc (curved)
            </div>
            {/* Chord label */}
            <div
                className="absolute text-sm font-semibold px-2 py-1 rounded"
                style={{
                    top: '35%',
                    left: '30%',
                    color: COLORS.chord,
                    backgroundColor: 'rgba(172, 139, 249, 0.15)',
                }}
            >
                Chord (straight)
            </div>
        </div>
    );
}

/** Sector and Segment comparison visualization */
function SectorSegmentDiagram() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Sector - Pizza slice */}
            <div className="flex flex-col items-center">
                <svg width="160" height="160" viewBox="-4 -4 8 8">
                    {/* Full circle outline */}
                    <circle cx="0" cy="0" r="3" fill="none" stroke="#94a3b8" strokeWidth="0.1" />
                    {/* Sector (pizza slice) */}
                    <path
                        d="M 0 0 L 3 0 A 3 3 0 0 1 1.5 2.6 Z"
                        fill={COLORS.sector}
                        fillOpacity="0.3"
                        stroke={COLORS.sector}
                        strokeWidth="0.15"
                    />
                    {/* Centre point */}
                    <circle cx="0" cy="0" r="0.15" fill={COLORS.centre} />
                    {/* Radius lines */}
                    <line x1="0" y1="0" x2="3" y2="0" stroke={COLORS.sector} strokeWidth="0.1" />
                    <line x1="0" y1="0" x2="1.5" y2="2.6" stroke={COLORS.sector} strokeWidth="0.1" />
                </svg>
                <div className="text-center mt-2">
                    <span className="font-semibold" style={{ color: COLORS.sector }}>Sector</span>
                    <p className="text-sm text-slate-500">Like a pizza slice</p>
                </div>
            </div>

            {/* Segment - Cut off by chord */}
            <div className="flex flex-col items-center">
                <svg width="160" height="160" viewBox="-4 -4 8 8">
                    {/* Full circle outline */}
                    <circle cx="0" cy="0" r="3" fill="none" stroke="#94a3b8" strokeWidth="0.1" />
                    {/* Segment (area between chord and arc) */}
                    <path
                        d="M -2.6 1.5 A 3 3 0 0 1 2.6 1.5 L -2.6 1.5 Z"
                        fill={COLORS.segment}
                        fillOpacity="0.3"
                        stroke={COLORS.segment}
                        strokeWidth="0.15"
                    />
                    {/* Chord line */}
                    <line x1="-2.6" y1="1.5" x2="2.6" y2="1.5" stroke={COLORS.chord} strokeWidth="0.15" />
                    {/* Centre point */}
                    <circle cx="0" cy="0" r="0.15" fill={COLORS.centre} />
                </svg>
                <div className="text-center mt-2">
                    <span className="font-semibold" style={{ color: COLORS.segment }}>Segment</span>
                    <p className="text-sm text-slate-500">Cut off by a chord</p>
                </div>
            </div>
        </div>
    );
}

/** Final assessment circle diagram */
function AssessmentCircleDiagram() {
    return (
        <Cartesian2D
            height={280}
            viewBox={{ x: [-5, 5], y: [-5, 5] }}
            showGrid={false}
            plots={[
                // The circle
                {
                    type: "circle",
                    center: [0, 0],
                    radius: 3.5,
                    color: '#64748b',
                    fillOpacity: 0.05,
                },
                // Centre point with label
                {
                    type: "point",
                    x: 0,
                    y: 0,
                    color: COLORS.centre,
                },
                // Diameter line
                {
                    type: "segment",
                    point1: [-3.5, 0] as [number, number],
                    point2: [3.5, 0] as [number, number],
                    color: COLORS.diameter,
                    weight: 3,
                },
                // A chord (not through centre)
                {
                    type: "segment",
                    point1: [-2, 2.87] as [number, number],
                    point2: [3, 1.87] as [number, number],
                    color: COLORS.chord,
                    weight: 2,
                },
            ]}
        />
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: INTRODUCTION
// ─────────────────────────────────────────────────────────────────────────────

export const introductionBlocks: ReactElement[] = [
    <StackLayout key="layout-intro-title" maxWidth="xl">
        <Block id="intro-title" padding="lg">
            <EditableH1 id="h1-intro-title" blockId="intro-title">
                Circle Basics and Properties
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-audio" maxWidth="xl">
        <Block id="intro-audio" padding="sm">
            <VideoDisplay
                src="https://www.youtube.com/watch?v=mMB9YhSQNdc"
                caption="Introduction to Parts of a Circle"
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-welcome" maxWidth="xl">
        <Block id="intro-welcome" padding="sm">
            <EditableParagraph id="para-intro-welcome" blockId="intro-welcome">
                Circles are everywhere. From the wheels on a bicycle to the face of a clock, this simple shape is one of the most important in mathematics. In this lesson, you will learn to identify every part of a circle and understand how these parts relate to each other.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-objectives" maxWidth="xl">
        <Block id="intro-objectives" padding="sm">
            <EditableH3 id="h3-intro-objectives" blockId="intro-objectives">
                What you will learn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-intro-objectives-list" maxWidth="xl">
        <Block id="intro-objectives-list" padding="sm">
            <EditableParagraph id="para-intro-objectives-list" blockId="intro-objectives-list">
                By the end of this lesson, you will be able to identify the{" "}
                <InlineTooltip id="tooltip-centre" tooltip="The exact middle point of a circle, equidistant from all points on the edge">
                    centre
                </InlineTooltip>
                ,{" "}
                <InlineTooltip id="tooltip-radius" tooltip="The distance from the centre to any point on the circle's edge">
                    radius
                </InlineTooltip>
                ,{" "}
                <InlineTooltip id="tooltip-diameter" tooltip="A straight line passing through the centre, connecting two points on the edge">
                    diameter
                </InlineTooltip>
                ,{" "}
                <InlineTooltip id="tooltip-circumference" tooltip="The distance around the outside of the circle (the perimeter)">
                    circumference
                </InlineTooltip>
                ,{" "}
                <InlineTooltip id="tooltip-chord" tooltip="A straight line connecting any two points on the circle's edge">
                    chord
                </InlineTooltip>
                ,{" "}
                <InlineTooltip id="tooltip-arc" tooltip="A curved portion of the circumference">
                    arc
                </InlineTooltip>
                ,{" "}
                <InlineTooltip id="tooltip-sector" tooltip="A 'pizza slice' shaped region bounded by two radii and an arc">
                    sector
                </InlineTooltip>
                , and{" "}
                <InlineTooltip id="tooltip-segment" tooltip="The region between a chord and its arc">
                    segment
                </InlineTooltip>
                . You will also understand that the diameter is always twice the radius.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: CENTRE, RADIUS & DIAMETER
// ─────────────────────────────────────────────────────────────────────────────

export const radiusDiameterBlocks: ReactElement[] = [
    <StackLayout key="layout-radius-heading" maxWidth="xl">
        <Block id="radius-heading" padding="md">
            <EditableH2 id="h2-radius-heading" blockId="radius-heading">
                The Centre, Radius, and Diameter
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-radius-intro" maxWidth="xl">
        <Block id="radius-intro" padding="sm">
            <EditableParagraph id="para-radius-intro" blockId="radius-intro">
                Every circle has a{" "}
                <InlineLinkedHighlight
                    varName="circlePartHighlight"
                    highlightId="centre"
                    color={COLORS.centre}
                    bgColor="rgba(34, 197, 94, 0.15)"
                >
                    centre
                </InlineLinkedHighlight>
                . This is the exact middle point. From the centre, every point on the edge of the circle is exactly the same distance away. This distance is called the{" "}
                <InlineLinkedHighlight
                    varName="circlePartHighlight"
                    highlightId="radius"
                    color={COLORS.radius}
                    bgColor="rgba(98, 208, 173, 0.15)"
                >
                    radius
                </InlineLinkedHighlight>
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-radius-interactive" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="radius-diagram" padding="sm" hasVisualization>
                <InteractiveCircleDiagram />
            </Block>
        </div>
        <div className="space-y-4">
            <Block id="radius-values" padding="sm">
                <RadiusDiameterValues />
            </Block>
            <Block id="radius-explanation" padding="sm">
                <EditableParagraph id="para-radius-explanation" blockId="radius-explanation">
                    Try dragging the{" "}
                    <InlineSpotColor varName="circleRadius" color={COLORS.radius}>
                        teal point
                    </InlineSpotColor>
                    {" "}around the circle. Notice how the radius value changes as you move it closer to or further from the centre. The{" "}
                    <InlineLinkedHighlight
                        varName="circlePartHighlight"
                        highlightId="diameter"
                        color={COLORS.diameter}
                        bgColor="rgba(142, 144, 245, 0.15)"
                    >
                        diameter
                    </InlineLinkedHighlight>
                    {" "}(shown as a dashed line) always stays exactly twice the radius.
                </EditableParagraph>
            </Block>
        </div>
    </SplitLayout>,

    <StackLayout key="layout-radius-formula" maxWidth="xl">
        <Block id="radius-formula" padding="md">
            <FormulaBlock
                latex="\text{Diameter} = 2 \times \text{Radius}"
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-radius-key-point" maxWidth="xl">
        <Block id="radius-key-point" padding="sm">
            <EditableParagraph id="para-radius-key-point" blockId="radius-key-point">
                <strong>Key Point:</strong> The diameter is a special line that passes through the centre and touches both sides of the circle. It is the longest possible chord. If you know the radius, you can always find the diameter by multiplying by 2. If you know the diameter, divide by 2 to find the radius.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Checkpoint 1
    <StackLayout key="layout-checkpoint-one-heading" maxWidth="xl">
        <Block id="checkpoint-one-heading" padding="md">
            <EditableH3 id="h3-checkpoint-one-heading" blockId="checkpoint-one-heading">
                Checkpoint 1
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-checkpoint-one-question" maxWidth="xl">
        <Block id="checkpoint-one-question" padding="sm">
            <EditableParagraph id="para-checkpoint-one-question" blockId="checkpoint-one-question">
                A circle has a radius of 5 cm. What is its diameter?{" "}
                <InlineFeedback
                    varName="answerDiameterValue"
                    correctValue="10"
                    position="terminal"
                    successMessage="— correct! Since diameter = 2 × radius, we get 2 × 5 = 10 cm"
                    failureMessage="— not quite."
                    hint="Remember: diameter = 2 × radius"
                    reviewBlockId="radius-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerDiameterValue"
                        correctAnswer="10"
                        {...clozePropsFromDefinition(getVariableInfo('answerDiameterValue'))}
                    />
                </InlineFeedback>{" "}cm.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: CIRCUMFERENCE
// ─────────────────────────────────────────────────────────────────────────────

export const circumferenceBlocks: ReactElement[] = [
    <StackLayout key="layout-circumference-heading" maxWidth="xl">
        <Block id="circumference-heading" padding="md">
            <EditableH2 id="h2-circumference-heading" blockId="circumference-heading">
                The Circumference
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-circumference-intro" maxWidth="xl">
        <Block id="circumference-intro" padding="sm">
            <EditableParagraph id="para-circumference-intro" blockId="circumference-intro">
                The{" "}
                <InlineSpotColor varName="circlePartHighlight" color={COLORS.circumference}>
                    circumference
                </InlineSpotColor>
                {" "}is the distance around the outside of the circle. Think of it as the perimeter of the circle. If you were an ant walking along the edge of a circular plate, the distance you would travel to get back to where you started is the circumference.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-circumference-visual" maxWidth="md">
        <Block id="circumference-visual" padding="sm" hasVisualization>
            <Cartesian2D
                height={280}
                viewBox={{ x: [-5, 5], y: [-5, 5] }}
                showGrid={false}
                plots={[
                    {
                        type: "circle",
                        center: [0, 0],
                        radius: 3.5,
                        color: COLORS.circumference,
                        fillOpacity: 0.08,
                    },
                    {
                        type: "point",
                        x: 0,
                        y: 0,
                        color: COLORS.centre,
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-circumference-note" maxWidth="xl">
        <Block id="circumference-note" padding="sm">
            <EditableParagraph id="para-circumference-note" blockId="circumference-note">
                The circumference is the curved boundary you see highlighted in{" "}
                <InlineSpotColor varName="circlePartHighlight" color={COLORS.circumference}>
                    amber
                </InlineSpotColor>
                . Every point on this line is exactly the same distance from the centre.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Checkpoint 2
    <StackLayout key="layout-checkpoint-two-heading" maxWidth="xl">
        <Block id="checkpoint-two-heading" padding="md">
            <EditableH3 id="h3-checkpoint-two-heading" blockId="checkpoint-two-heading">
                Checkpoint 2
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-checkpoint-two-question" maxWidth="xl">
        <Block id="checkpoint-two-question" padding="sm">
            <EditableParagraph id="para-checkpoint-two-question" blockId="checkpoint-two-question">
                The distance around the outside of a circle is called the{" "}
                <InlineFeedback
                    varName="answerCircumferenceName"
                    correctValue="circumference"
                    position="terminal"
                    successMessage="— exactly right! The circumference is the perimeter of a circle"
                    failureMessage="— not quite."
                    hint="Think about what we call the perimeter of a circle"
                    reviewBlockId="circumference-intro"
                    reviewLabel="Go back to the explanation"
                >
                    <InlineClozeChoice
                        varName="answerCircumferenceName"
                        correctAnswer="circumference"
                        options={["radius", "diameter", "circumference", "chord"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerCircumferenceName'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: CHORDS & ARCS
// ─────────────────────────────────────────────────────────────────────────────

export const chordsArcsBlocks: ReactElement[] = [
    <StackLayout key="layout-chords-heading" maxWidth="xl">
        <Block id="chords-heading" padding="md">
            <EditableH2 id="h2-chords-heading" blockId="chords-heading">
                Chords and Arcs
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-chords-intro" maxWidth="xl">
        <Block id="chords-intro" padding="sm">
            <EditableParagraph id="para-chords-intro" blockId="chords-intro">
                A{" "}
                <InlineSpotColor varName="circlePartHighlight" color={COLORS.chord}>
                    chord
                </InlineSpotColor>
                {" "}is any straight line that connects two points on the circumference. It does not have to pass through the centre. In fact, when a chord does pass through the centre, it has a special name: the diameter!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-chords-diagram" maxWidth="md">
        <Block id="chords-diagram" padding="sm" hasVisualization>
            <ChordArcDiagram />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-arc-explanation" maxWidth="xl">
        <Block id="arc-explanation" padding="sm">
            <EditableParagraph id="para-arc-explanation" blockId="arc-explanation">
                An{" "}
                <InlineSpotColor varName="circlePartHighlight" color={COLORS.arc}>
                    arc
                </InlineSpotColor>
                {" "}is a curved portion of the circumference. When a chord divides the circle, it creates two arcs: a longer one (major arc) and a shorter one (minor arc). The key difference is simple:{" "}
                <strong>chords are straight, arcs are curved</strong>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Checkpoint 3
    <StackLayout key="layout-checkpoint-three-heading" maxWidth="xl">
        <Block id="checkpoint-three-heading" padding="md">
            <EditableH3 id="h3-checkpoint-three-heading" blockId="checkpoint-three-heading">
                Checkpoint 3
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-checkpoint-three-question" maxWidth="xl">
        <Block id="checkpoint-three-question" padding="sm">
            <EditableParagraph id="para-checkpoint-three-question" blockId="checkpoint-three-question">
                A chord is a{" "}
                <InlineFeedback
                    varName="answerChordDefinition"
                    correctValue="straight line"
                    position="mid"
                    successMessage="✓"
                    failureMessage="✗"
                    hint="Look at the diagram above"
                >
                    <InlineClozeChoice
                        varName="answerChordDefinition"
                        correctAnswer="straight line"
                        options={["curved line", "straight line", "the centre", "the radius"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerChordDefinition'))}
                    />
                </InlineFeedback>{" "}
                that connects two points on the circumference.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: SECTORS & SEGMENTS
// ─────────────────────────────────────────────────────────────────────────────

export const sectorsSegmentsBlocks: ReactElement[] = [
    <StackLayout key="layout-sectors-heading" maxWidth="xl">
        <Block id="sectors-heading" padding="md">
            <EditableH2 id="h2-sectors-heading" blockId="sectors-heading">
                Sectors and Segments
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sectors-intro" maxWidth="xl">
        <Block id="sectors-intro" padding="sm">
            <EditableParagraph id="para-sectors-intro" blockId="sectors-intro">
                When you divide a circle, you create different regions. Two important ones are the{" "}
                <InlineSpotColor varName="circlePartHighlight" color={COLORS.sector}>
                    sector
                </InlineSpotColor>
                {" "}and the{" "}
                <InlineSpotColor varName="circlePartHighlight" color={COLORS.segment}>
                    segment
                </InlineSpotColor>
                . They look similar but are created in different ways.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sectors-diagram" maxWidth="lg">
        <Block id="sectors-diagram" padding="md" hasVisualization>
            <SectorSegmentDiagram />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sectors-explanation" maxWidth="xl">
        <Block id="sectors-explanation" padding="sm">
            <EditableParagraph id="para-sectors-explanation" blockId="sectors-explanation">
                <strong>Sector:</strong> This is the region bounded by two radii and an arc. It looks like a pizza slice. The two straight edges both start from the centre.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-segment-explanation" maxWidth="xl">
        <Block id="segment-explanation" padding="sm">
            <EditableParagraph id="para-segment-explanation" blockId="segment-explanation">
                <strong>Segment:</strong> This is the region between a chord and an arc. It looks like the piece you get when you slice across a circle. Unlike a sector, it does not include the centre of the circle.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Checkpoint 4
    <StackLayout key="layout-checkpoint-four-heading" maxWidth="xl">
        <Block id="checkpoint-four-heading" padding="md">
            <EditableH3 id="h3-checkpoint-four-heading" blockId="checkpoint-four-heading">
                Checkpoint 4
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-checkpoint-four-question" maxWidth="xl">
        <Block id="checkpoint-four-question" padding="sm">
            <EditableParagraph id="para-checkpoint-four-question" blockId="checkpoint-four-question">
                A sector looks like a{" "}
                <InlineFeedback
                    varName="answerSectorShape"
                    correctValue="pizza slice"
                    position="terminal"
                    successMessage="— that's right! A sector has two straight edges from the centre, like a pizza slice"
                    failureMessage="— not quite."
                    hint="Look at the left diagram above. Which shape does a sector resemble?"
                    reviewBlockId="sectors-diagram"
                    reviewLabel="Look at the diagram again"
                >
                    <InlineClozeChoice
                        varName="answerSectorShape"
                        correctAnswer="pizza slice"
                        options={["pizza slice", "orange segment", "half circle", "square"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerSectorShape'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: FINAL ASSESSMENT
// ─────────────────────────────────────────────────────────────────────────────

export const finalAssessmentBlocks: ReactElement[] = [
    <StackLayout key="layout-assessment-heading" maxWidth="xl">
        <Block id="assessment-heading" padding="lg">
            <EditableH2 id="h2-assessment-heading" blockId="assessment-heading">
                Final Assessment
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-intro" maxWidth="xl">
        <Block id="assessment-intro" padding="sm">
            <EditableParagraph id="para-assessment-intro" blockId="assessment-intro">
                Now let us test your understanding with some O-Level style questions. Take your time and think carefully about each answer.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 1: Calculate radius from diameter
    <StackLayout key="layout-assessment-q1-heading" maxWidth="xl">
        <Block id="assessment-q1-heading" padding="md">
            <EditableH3 id="h3-assessment-q1-heading" blockId="assessment-q1-heading">
                Question 1
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-q1" maxWidth="xl">
        <Block id="assessment-q1" padding="sm">
            <EditableParagraph id="para-assessment-q1" blockId="assessment-q1">
                A circular disc has a diameter of 14 cm. Find the radius of the disc.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-q1-answer" maxWidth="xl">
        <Block id="assessment-q1-answer" padding="sm">
            <EditableParagraph id="para-assessment-q1-answer" blockId="assessment-q1-answer">
                Radius ={" "}
                <InlineFeedback
                    varName="answerFinalRadius"
                    correctValue="7"
                    position="terminal"
                    successMessage="— correct! Radius = Diameter ÷ 2 = 14 ÷ 2 = 7 cm"
                    failureMessage="— not quite."
                    hint="To find the radius, divide the diameter by 2"
                    reviewBlockId="radius-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerFinalRadius"
                        correctAnswer="7"
                        {...clozePropsFromDefinition(getVariableInfo('answerFinalRadius'))}
                    />
                </InlineFeedback>{" "}cm.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 2: Calculate diameter from radius
    <StackLayout key="layout-assessment-q2-heading" maxWidth="xl">
        <Block id="assessment-q2-heading" padding="md">
            <EditableH3 id="h3-assessment-q2-heading" blockId="assessment-q2-heading">
                Question 2
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-q2" maxWidth="xl">
        <Block id="assessment-q2" padding="sm">
            <EditableParagraph id="para-assessment-q2" blockId="assessment-q2">
                A wheel has a radius of 4 cm. What is the diameter of the wheel?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-q2-answer" maxWidth="xl">
        <Block id="assessment-q2-answer" padding="sm">
            <EditableParagraph id="para-assessment-q2-answer" blockId="assessment-q2-answer">
                Diameter ={" "}
                <InlineFeedback
                    varName="answerFinalDiameter"
                    correctValue="8"
                    position="terminal"
                    successMessage="— well done! Diameter = 2 × Radius = 2 × 4 = 8 cm"
                    failureMessage="— try again."
                    hint="Multiply the radius by 2 to find the diameter"
                >
                    <InlineClozeInput
                        varName="answerFinalDiameter"
                        correctAnswer="8"
                        {...clozePropsFromDefinition(getVariableInfo('answerFinalDiameter'))}
                    />
                </InlineFeedback>{" "}cm.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 3: Identify parts
    <StackLayout key="layout-assessment-q3-heading" maxWidth="xl">
        <Block id="assessment-q3-heading" padding="md">
            <EditableH3 id="h3-assessment-q3-heading" blockId="assessment-q3-heading">
                Question 3
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-q3-diagram" maxWidth="md">
        <Block id="assessment-q3-diagram" padding="sm" hasVisualization>
            <AssessmentCircleDiagram />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-q3" maxWidth="xl">
        <Block id="assessment-q3" padding="sm">
            <EditableParagraph id="para-assessment-q3" blockId="assessment-q3">
                In the diagram above, the horizontal line passes through the centre of the circle. This line is called the{" "}
                <InlineFeedback
                    varName="answerFinalPartName"
                    correctValue="diameter"
                    position="terminal"
                    successMessage="— exactly! Any chord that passes through the centre is called the diameter"
                    failureMessage="— not quite."
                    hint="What do we call a chord that passes through the centre?"
                >
                    <InlineClozeChoice
                        varName="answerFinalPartName"
                        correctAnswer="diameter"
                        options={["radius", "diameter", "chord", "arc"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerFinalPartName'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 4: Chord vs Arc
    <StackLayout key="layout-assessment-q4-heading" maxWidth="xl">
        <Block id="assessment-q4-heading" padding="md">
            <EditableH3 id="h3-assessment-q4-heading" blockId="assessment-q4-heading">
                Question 4
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-assessment-q4" maxWidth="xl">
        <Block id="assessment-q4" padding="sm">
            <EditableParagraph id="para-assessment-q4" blockId="assessment-q4">
                What is the main difference between a chord and an arc?{" "}
                <InlineFeedback
                    varName="answerFinalChordArc"
                    correctValue="chord is straight, arc is curved"
                    position="terminal"
                    successMessage="— perfect! A chord is always a straight line, while an arc is curved"
                    failureMessage="— think again."
                    hint="Consider the shape of each: one is straight, one is curved"
                    reviewBlockId="arc-explanation"
                    reviewLabel="Review the explanation"
                >
                    <InlineClozeChoice
                        varName="answerFinalChordArc"
                        correctAnswer="chord is straight, arc is curved"
                        options={["both are curved", "chord is straight, arc is curved", "both are straight", "arc is straight, chord is curved"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerFinalChordArc'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Summary
    <StackLayout key="layout-summary-heading" maxWidth="xl">
        <Block id="summary-heading" padding="lg">
            <EditableH2 id="h2-summary-heading" blockId="summary-heading">
                Summary
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-summary-content" maxWidth="xl">
        <Block id="summary-content" padding="sm">
            <EditableParagraph id="para-summary-content" blockId="summary-content">
                You have now learned the key parts of a circle: the centre, radius, diameter, circumference, chord, arc, sector, and segment. Remember the most important relationship: the diameter is always twice the radius (d = 2r). This formula appears frequently in O-Level examinations.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ALL BLOCKS
// ─────────────────────────────────────────────────────────────────────────────

export const circleBasicsLessonBlocks: ReactElement[] = [
    ...introductionBlocks,
    ...radiusDiameterBlocks,
    ...circumferenceBlocks,
    ...chordsArcsBlocks,
    ...sectorsSegmentsBlocks,
    ...finalAssessmentBlocks,
];
