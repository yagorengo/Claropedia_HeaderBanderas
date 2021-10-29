import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import * as ReactDOM from "react-dom";  
import ReactHeader, { IReactHeader } from "./ReactHeader";  
import * as React from 'react';
import * as strings from 'HeaderPaisesApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HeaderPaisesApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderPaisesApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderPaisesApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderPaisesApplicationCustomizerProperties> {

    private static headerPlaceholder: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.application.navigatedEvent.add(this, () => {
      this.loadReactComponent();
    });
    this.render();

    return Promise.resolve();
  }

  private async loadReactComponent() {
   
    if (HeaderPaisesApplicationCustomizer.headerPlaceholder && HeaderPaisesApplicationCustomizer.headerPlaceholder.domElement) {
      const element: React.ReactElement<IReactHeader> = React.createElement(ReactHeader, {context: this.context});

      ReactDOM.render(element, HeaderPaisesApplicationCustomizer.headerPlaceholder.domElement);
    }
    else {
      console.log('DOM element of the header is undefined. Start to re-render.');
      this.render();
    }
  }
  private render(): void {
    if (this.context.placeholderProvider.placeholderNames.indexOf(PlaceholderName.Top) !== -1) {
      if (!HeaderPaisesApplicationCustomizer.headerPlaceholder || !HeaderPaisesApplicationCustomizer.headerPlaceholder.domElement) {
        HeaderPaisesApplicationCustomizer.headerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
          onDispose: this._onDispose
        });
      }

      this.loadReactComponent();
    }
    else {
      console.log(`The following placeholder names are available`, this.context.placeholderProvider.placeholderNames);
    }
  }
  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
