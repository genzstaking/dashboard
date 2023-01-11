


/**
 * A decorator to add template into a component
 */
export const template = (name: string) => {
    return (component: any) => {
        component.template = name;
    }
}