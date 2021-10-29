import * as React from "react";  
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import styles from "./ReactHeader.module.scss";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { Image, IImageProps, ImageFit } from '@fluentui/react/lib/Image';
export interface IReactHeader {
    context:ApplicationCustomizerContext
}

export default class ReactHeader extends React.Component<IReactHeader,{}> { 

    private flangerUy:IImageProps = {
        className: styles.flag,
        imageFit: ImageFit.contain, 
        src:'https://claroaup.sharepoint.com/sites/ClaroPedia365_uybkp/SiteAssets/HomeIcons/bandera-Uy.png'
    };
    private flangerPy:IImageProps = {
        className: styles.flag,
        imageFit: ImageFit.contain, 
        src:'https://claroaup.sharepoint.com/sites/ClaroPedia365_uybkp/SiteAssets/HomeIcons/bandera-Py.png'
    }
    private flangerAr:IImageProps = {
        className: styles.flag,
        imageFit: ImageFit.contain, 
        src:'https://claroaup.sharepoint.com/sites/ClaroPedia365_uybkp/SiteAssets/HomeIcons/bandera-Ar.png'
    }

    private _items:ICommandBarItemProps[] =[
        {
            key: 'Ar',
            text: 'Argentina',
            iconProps: {imageProps:this.flangerAr, className:styles.icon},
            href:"https://claroaup.sharepoint.com/sites/Claropedia2"
          },
          {
            key: 'Uy',
            text: 'Uruguay',
            iconProps: {imageProps:this.flangerUy, className:styles.icon},
            href: 'https://claroaup.sharepoint.com/sites/ClaroPedia365_uy',
            renderedInOverflow: true
          },
          {
            key: 'Py',
            text: 'Paraguay',
            iconProps: {imageProps:this.flangerPy, className:styles.icon},
            href: 'https://claroaup.sharepoint.com/sites/ClaroPedia365_py',
            renderedInOverflow: false
          }
    ] ;

    

public render():JSX.Element{
    console.log("context", this.props.context.pageContext)
    return(
        <div className={styles.app}>
                <CommandBar
                    items={this._items}
                />
            </div>
    )
}
}