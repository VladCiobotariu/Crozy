import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 style={{ 
        fontSize: '2.25rem', //36px
        lineHeight: '2.75rem',
      }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ 
        fontSize: '2rem', //32px
        lineHeight: '2.15rem',
        marginBottom: '1rem'
      }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ 
        fontSize: '1.75rem', //28px
      }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ 
        fontSize: '1.5rem', //24px
      }}>{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 style={{ 
        fontSize: '1.125rem', //18px
      }}>{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 style={{ 
        fontSize: '1rem', //16px
      }}>{children}</h6>
    ),
    ul: ({ children }) => (
      <ul style={{ 
        paddingInlineStart: "2em",
      }}>{children}</ul>
    ),
    ...components,
  }
}