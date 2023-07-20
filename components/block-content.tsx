import { PortableText } from '@portabletext/react';

//todo: customize components to match our style
const ptComponents = {
  types: {
    
  },
  marks: {
    link: ({children, value}: any) => {
      const isExternal = !value.href.startsWith('/');
      const rel = isExternal ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} target={isExternal ? '_blank' : ''} rel={rel}>
          {children}
        </a>
      )
    },
  },
  block: {
    normal: ({children}: any) => (
      <ol className="my-2">{children}</ol>
    ),
  },
  list: {
    number: ({children}: any) => (
      <ol className="my-2 list-decimal mx-2 px-2">{children}</ol>
    ),
    bullet: ({children}: any) => (
      <ol className="my-2 list-disc mx-2 px-2">{children}</ol>
    ),
  }
}

function BlockContent({content}: any) {

  return (
    <>
    <PortableText 
      value={content}
      components={ptComponents} />
    </>
  )

}


export default BlockContent;