/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 CIRCLE BASICS LESSON VARIABLES
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ─────────────────────────────────────────
    // INTERACTIVE RADIUS VALUE
    // ─────────────────────────────────────────
    circleRadius: {
        defaultValue: 3,
        type: 'number',
        label: 'Radius',
        description: 'The radius of the circle for interactive exploration',
        unit: 'cm',
        min: 1,
        max: 5,
        step: 0.5,
        color: '#62D0AD',
    },

    // ─────────────────────────────────────────
    // LINKED HIGHLIGHT FOR CIRCLE PARTS
    // ─────────────────────────────────────────
    circlePartHighlight: {
        defaultValue: '',
        type: 'text',
        label: 'Circle Part Highlight',
        description: 'Currently highlighted part of the circle',
        color: '#8E90F5',
        bgColor: 'rgba(142, 144, 245, 0.15)',
    },

    // ─────────────────────────────────────────
    // CHECKPOINT 1: DIAMETER QUESTION
    // ─────────────────────────────────────────
    answerDiameterValue: {
        defaultValue: '',
        type: 'text',
        label: 'Diameter Answer',
        description: 'Student answer for diameter calculation',
        placeholder: '?',
        correctAnswer: '10',
        color: '#8E90F5',
    },

    // ─────────────────────────────────────────
    // CHECKPOINT 2: CIRCUMFERENCE IDENTIFICATION
    // ─────────────────────────────────────────
    answerCircumferenceName: {
        defaultValue: '',
        type: 'select',
        label: 'Circumference Name',
        description: 'Student identifies the circumference',
        placeholder: '???',
        correctAnswer: 'circumference',
        options: ['radius', 'diameter', 'circumference', 'chord'],
        color: '#F7B23B',
    },

    // ─────────────────────────────────────────
    // CHECKPOINT 3: CHORD VS ARC
    // ─────────────────────────────────────────
    answerChordDefinition: {
        defaultValue: '',
        type: 'select',
        label: 'Chord Definition',
        description: 'Student identifies what a chord is',
        placeholder: '???',
        correctAnswer: 'straight line',
        options: ['curved line', 'straight line', 'the centre', 'the radius'],
        color: '#AC8BF9',
    },

    // ─────────────────────────────────────────
    // CHECKPOINT 4: SECTOR VS SEGMENT
    // ─────────────────────────────────────────
    answerSectorShape: {
        defaultValue: '',
        type: 'select',
        label: 'Sector Shape',
        description: 'Student identifies what a sector looks like',
        placeholder: '???',
        correctAnswer: 'pizza slice',
        options: ['pizza slice', 'orange segment', 'half circle', 'square'],
        color: '#F8A0CD',
    },

    // ─────────────────────────────────────────
    // FINAL ASSESSMENT QUESTIONS
    // ─────────────────────────────────────────
    answerFinalRadius: {
        defaultValue: '',
        type: 'text',
        label: 'Final Radius Question',
        description: 'Final assessment radius question',
        placeholder: '?',
        correctAnswer: '7',
        color: '#62D0AD',
    },

    answerFinalDiameter: {
        defaultValue: '',
        type: 'text',
        label: 'Final Diameter Question',
        description: 'Final assessment diameter question',
        placeholder: '?',
        correctAnswer: '8',
        color: '#8E90F5',
    },

    answerFinalPartName: {
        defaultValue: '',
        type: 'select',
        label: 'Final Part Name',
        description: 'Identify the part that passes through centre',
        placeholder: '???',
        correctAnswer: 'diameter',
        options: ['radius', 'diameter', 'chord', 'arc'],
        color: '#F7B23B',
    },

    answerFinalChordArc: {
        defaultValue: '',
        type: 'select',
        label: 'Final Chord Arc Question',
        description: 'Difference between chord and arc',
        placeholder: '???',
        correctAnswer: 'chord is straight, arc is curved',
        options: ['both are curved', 'chord is straight, arc is curved', 'both are straight', 'arc is straight, chord is curved'],
        color: '#AC8BF9',
    },

    // ─────────────────────────────────────────
    // DRAWING TASK STATUS
    // ─────────────────────────────────────────
    drawRadiusStatus: {
        defaultValue: 'pending',
        type: 'text',
        label: 'Draw Radius Task Status',
        description: 'Status of the draw radius visual task',
    },

    // ─────────────────────────────────────────
    // STEP LAYOUT PROGRESS
    // ─────────────────────────────────────────
    lessonProgress: {
        defaultValue: 0,
        type: 'number',
        label: 'Lesson Progress',
        description: 'Current step in the lesson',
        min: 0,
        max: 10,
        step: 1,
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
