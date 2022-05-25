declare module '*.less' {
        const stylesLess: {
                [key: string]: string
        };
        export = stylesLess
}

declare module '*.css' {
        const stylesCss: {
                [key: string]: string
        };
        export = stylesCss
}
