"use client";

import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

export type Type = 'solid' | 'outline' | 'clear';
export type Size = 'normal' | 'large' | 'small';
export type Color = 'primary' | 'accent' | 'black' | 'white' | 'slate';

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


  const handleClick = (e: React.MouseEvent) => {
    if (props.disabled) {
      e.preventDefault();
    } else if (typeof(props.onClick) === 'function') {
      props.onClick(e);
    }
  }

  useEffect(() => {
    setCss(buildCss(props.type || (isLink(props) ? 'clear': 'solid'), props.color || 'primary', props.size || 'normal', props.disabled, props.className));
  }, [props])


  return (
    <>
    {isLink(props) && (
      <Link 
        href={props.href || ''} 
        className={css}
        onClick={(e) => handleClick(e)}>
        {props.children}
      </Link>
    )}
    {!isLink(props) && (
      <button 
        type={props.submit ? 'submit' : 'button'}
        className={css}
        disabled={props.disabled === true}
        onClick={(e) => handleClick(e)}>
        {props.children}
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
    'relative',
    'py-2 px-4',
    getBorder(type, color),
    bgColor(type, color),
    textColor(type, color),
    disabled ? 'opacity-30' : '',
    after(type, color),
    hover(type, color),
    additionalCss || ''
  ].join(' ');
}
function textColor(type: Type, color: Color) {
  return `text-${getColor(color, type === 'solid')}`;
}
function bgColor(type: Type, color: Color) {
  return `bg-${getColor(type === 'solid' ? color : 'white')}`;
}
function after(type: Type, color: Color) {
  return [
    `after:rounded`,
    `after:content=['']`,
    `after:absolute`,
    `after:top-0 after:left-0 after:bottom-0 after:right-0`,
    `after:opacity-0`,
    `after:bg-fuchsia-600`,
    //`after:bg-${getColor(color, type === 'solid', true)}`,
    
  ].join(' ');
}
function hover(type: Type, color: Color) {
  return `hover:after:animate-expand-bg`
}

function getColor(color: Color, inverse?: boolean, dark?: boolean) {
  if (dark) {
    switch (color) {
      case 'primary':
        return inverse ? 'fuchsia-300' : 'fuchsia-800';
      case 'accent': 
        return inverse ? 'amber-300' : 'amber-800';
      case 'black':
        return inverse ? 'slate-100' : 'slate-800';
      case 'white':
        return inverse ? 'slate-300' : 'slate-100';
      default:
        return inverse ? 'slate-200' : 'slate-800';
    }
  }
  //else not - dark
  switch (color) {
    case 'primary':
      return inverse ? 'fuchsia-50' : 'fuchsia-600';
    case 'accent': 
      return inverse ? 'amber-100' : 'amber-700';
    case 'black':
      return inverse ? 'white' : 'black';
    case 'white':
      return inverse ? 'black' : 'white';
    default:
      return inverse ? 'slate-50' : 'slate-600';
  }
}
function getBorder(type: Type, color: Color) {
  const generalStyle = 'outline-none focus:outline-none ring-none'
  switch (type) {
    case 'outline':
      return `border-2 rounded border-${getColor(color)} ${generalStyle}`;
    case 'solid':
    case 'clear':
    default:
      return `border-0 rounded ${generalStyle}`;
  }
}