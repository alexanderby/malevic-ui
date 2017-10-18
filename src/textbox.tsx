import { html, classes/*, NodeAttrs*/ } from 'malevic';
import { getPrefix } from './prefix';
import { NodeAttrs } from '../defs';

const managedAttrs = [
    'class',
    'didmount',
    'didupdate',
    'value',
].reduce((map, key) => map.add(key), new Set());

interface TextBoxAttrs extends NodeAttrs {
    max?: number;
    min?: number;
    onchange?: (this: HTMLInputElement, e: Event & { target: HTMLInputElement }) => void;
    oninput?: (this: HTMLInputElement, e: Event & { target: HTMLInputElement }) => void;
    readonly?: boolean;
    step?: number;
    type?: 'text' | 'number';
    value?: string | number;
}

export default function TextBox(props: TextBoxAttrs, value?: string | number) {
    props = props || {};
    const cls = classes(`${getPrefix()}textbox`, ...(Array.isArray(props.class) ? props.class : [props.class]));
    const attrs = props == null ? null : Object.keys(props)
        .filter((key) => !managedAttrs.has(key))
        .reduce((map, key) => (map[key] = props[key], map), {});

    const result = value != null ? value : props.value != null ? props.value : '';

    return (
        <input
            class={cls}
            type={props.type || 'text'}
            didmount={(domNode: HTMLInputElement) => {
                domNode.setAttribute('value', String(result));
                if (props.didmount) {
                    props.didmount.call(null, domNode);
                }
            }}
            didupdate={(domNode: HTMLInputElement) => {
                domNode.value = String(result);
                if (props.didupdate) {
                    props.didupdate.call(null, domNode);
                }
            }}
            {...attrs}
        />
    );
}
