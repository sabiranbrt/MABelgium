declare module "*.svg" {
    import React from "react"
    import { SvgProps } from "react-native-svg"
    const content: React.FC<SvgProps>
    export default content
}


declare module "*.jpg" {
    const value: any
    export = value;
}

declare module "*.jpeg" {
    const value: any
    export = value;
}

declare module "*.png" {
    const value: any
    export = value;
}
declare module "*.webp" {
    const value: any
    export = value;
}

type TODO = any