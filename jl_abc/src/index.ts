import {Widget} from '@phosphor/widgets';

import {IRenderMime} from '@jupyterlab/rendermime-interfaces';

import {renderAbc} from 'abcjs';

import '../style/index.css';

const ABC_MIME_TYPE = 'text/vnd.abc';
const ABC_CLASS = 'jp-RenderedAbc';

export
class RenderedAbc extends Widget implements IRenderMime.IRenderer {
 
  constructor(options: IRenderMime.IRendererOptions) {
     super();

     this.addClass(ABC_CLASS);
     this._abcEmbed = document.createElement('div');
     this._abcEmbed.innerHTML = '<i>Placeholder</i>';
     this.node.appendChild(this._abcEmbed);
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data:any = model.data[ABC_MIME_TYPE]; 

    // render ABC string
    renderAbc(this._abcEmbed, data);

    return Promise.resolve(undefined);
  }

  _abcEmbed: HTMLElement;
}

export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [ABC_MIME_TYPE],
  createRenderer: options => new RenderedAbc(options)
};

const extension: IRenderMime.IExtension = {
  id: 'jl_abc',
  rendererFactory,
  rank: 0,
  dataType: 'string',
  documentWidgetFactoryOptions: [{
    name: 'Abc',
    modelName: 'text',
    primaryFileType: 'abc',
    fileTypes: ['abc'],
    defaultFor: ['abc']
  }],
  fileTypes: [{
    mimeTypes: [ABC_MIME_TYPE],
    name: 'abc',
    fileFormat: 'text',
    extensions: ['.abc', '.abc.txt'],
    iconClass: 'jp-MaterialIcon jp-VegaIcon',
  }]
};

export default extension;
