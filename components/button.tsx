"use client";

import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

export type Type = 'solid' | 'outline' | 'clear';
export type Size = 'normal' | 'large' | 'small';
export type Color = 'primary' | 'accent' | 'black' | 'white' | 'slate';

type CssVariant = Record<Type, Record<Color, string>>;

const cssVariants: CssVariant = {
  solid: {
    primary: 'text-fuchsia-50 bg-fuchsia-600',
    accent: 'text-amber-100 bg-amber-600',
    black: 'text-slate-50 bg-slate-900',
    white: 'text-slate-900 bg-white',
    slate: 'text-slate-50 bg-slate-600',
  },
  outline: {
    primary: 'text-fuchsia-600 bg-transparent border-fuchsia-600',
    accent: 'text-amber-700 bg-transparent border-amber-700',
    black: 'text-slate-900 bg-transparent border-slate-900',
    white: 'text-white bg-transparent border-white',
    slate: 'text-slate-600 bg-transparent border-slate-600',
  },
  clear: {
    primary: 'text-fuchsia-600 bg-transparent',
    accent: 'text-amber-700 bg-transparent',
    black: 'text-slate-900 bg-transparent',
    white: 'text-white bg-transparent',
    slate: 'text-slate-600 bg-transparent',
  },
}

const cssVariantEffect: CssVariant = {
  solid: {
    primary: 'bg-fuchsia-50',
    accent: 'bg-amber-100',
    black: 'bg-slate-100',
    white: 'bg-slate-100',
    slate: 'bg-slate-50',
  },
  outline: {
    primary: 'bg-fuchsia-600/50',
    accent: 'bg-amber-700/50',
    black: 'bg-slate-900/50',
    white: 'bg-slate-50',
    slate: 'bg-slate-600/50',
  },
  clear: {
    primary: 'bg-fuchsia-600/50',
    accent: 'bg-amber-700/50',
    black: 'bg-slate-900/50',
    white: 'bg-slate-50',
    slate: 'bg-slate-600/50',
  },
}


export interface ButtonProps {
  type?: Type;
  size?: Size;
  color?: Color;

  disabled?: boolean;

  submit?: boolean; //results in a button type="submit"
  href?: string;    //results in a Link (rather than a button)

  onClick?: (e: React.MouseEvent) => void;    //on a link, need to call e.preventDefault()

  className?: string;
  children?: ReactNode;

}

function Button(props: ButtonProps) {
  const [css, setCss] = useState('');
  const [cssEffect, setCssEffect] = useState('');


  const handleClick = (e: React.MouseEvent) => {
    if (props.disabled) {
      e.preventDefault();
    } else if (typeof(props.onClick) === 'function') {
      props.onClick(e);
    }
  }

  useEffect(() => {
    setCss(buildCss(props.type || (isLink(props) ? 'clear': 'solid'), props.color || 'primary', props.size || 'normal', props.disabled, props.className));
    setCssEffect(buildCssEffect(props.type || (isLink(props) ? 'clear': 'solid'), props.color || 'primary', props.size || 'normal', props.disabled, props.className));
  }, [props])


  return (
    <>
    {isLink(props) && (
      <Link 
        href={props.href || ''} 
        className={css}
        onClick={(e) => handleClick(e)}>
        {props.children}
        <span className={cssEffect}></span>
      </Link>
    )}
    {!isLink(props) && (
      <button 
        type={props.submit ? 'submit' : 'button'}
        className={css}
        disabled={props.disabled === true}
        onClick={(e) => handleClick(e)}>
        {props.children}
        <span className={cssEffect}></span>
      </button>
    )}
    </>
  )

}

export default Button;

function isLink(props: ButtonProps) {
  return typeof(props.href) === 'string' && props.href.length > 0
}

function buildCss(type: Type, color: Color, size: Size, disabled?: boolean, additionalCss?: string) {
  return [
    'group', //important for the hover effect
    'relative',
    'py-2 px-4',
    type === 'outline' ? 'border-2' : 'border-0',
    'rounded',
    cssVariants[type][color],
    disabled ? 'opacity-30' : '',
    additionalCss || ''
  ].join(' ');
}
function buildCssEffect(type: Type, color: Color, size: Size, disabled?: boolean, additionalCss?: string) {
  return [
    'absolute',
    'top-0 bottom-0 right-0 left-0',
    'rounded opacity-0',
    cssVariantEffect[type][color],
    'transition-opacity duration-300',
    'group-hover:opacity-20',
    'group-active:animate-expand'
  ].join(' ');
}

