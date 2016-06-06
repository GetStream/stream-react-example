/**
 * LEFT
 * @type {string}
 */
export const LEFT = 'HEADER_LEFT'

/**
 * left
 * @param component
 * @returns {{type: string, component: *}}
 */
export function left(component) {
    return {
        type: LEFT,
        component,
    }
}

/**
 * MIDDLE
 * @type {string}
 */
export const MIDDLE = 'HEADER_MIDDLE'


/**
 * middle
 * @param component
 * @returns {{type: string, component: *}}
 */
export function middle(component) {
    return {
        type: MIDDLE,
        component,
    }
}

/**
 * RIGHT
 * @type {string}
 */
export const RIGHT = 'HEADER_RIGHT'

/**
 * right
 * @param component
 * @returns {{type: string, component: *}}
 */
export function right(component) {
    return {
        type: RIGHT,
        component,
    }
}
