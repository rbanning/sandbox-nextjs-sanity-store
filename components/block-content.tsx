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
    }
  },
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