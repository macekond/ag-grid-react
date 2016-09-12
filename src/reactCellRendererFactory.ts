import {ICellRenderer} from 'ag-grid';

var React = require('react');
var ReactDOM = require('react-dom');

export function reactCellRendererFactory(reactComponent: any, parentComponent?: any): {new(): ICellRenderer} {

/*    return (params: any): HTMLElement | string => {

        var eParentElement = params.eParentOfValue;

        var ReactComponent = React.createElement(reactComponent, { params: params });
        if (!parentComponent) {
            ReactDOM.render(ReactComponent, eParentElement);
        } else {
            ReactDOM.unstable_renderSubtreeIntoContainer(parentComponent, ReactComponent, eParentElement);
        }

        // if you are reading this, and want to do it using jsx, the equivalent is below.
        // however because we don't have the actual class here (just a reference to the class)
        // it can't be built into jsx. besides, the ag-grid-react-component project is so
        // small, i didn't set up jsx for it.
        //ReactDOM.render(<SkillsCellRenderer params={params}/>, eCell);

        // we want to know when the row is taken out of the grid, so that we do React cleanup
        params.addRenderedRowListener('renderedRowRemoved', () => {
            ReactDOM.unmountComponentAtNode(eParentElement);
        });

        // return null to the grid, as we don't want it responsible for rendering
        return null;

    };*/

    class ReactCellRenderer implements ICellRenderer {

        private eParentElement: HTMLElement;

        public init(params: any): void {
            this.eParentElement = params.eParentOfValue;

            var ReactComponent = React.createElement(reactComponent, { params: params });
            if (!parentComponent) {
                ReactDOM.render(ReactComponent, this.eParentElement);
            } else {
                ReactDOM.unstable_renderSubtreeIntoContainer(parentComponent, ReactComponent, this.eParentElement);
            }
        }

        public getGui(): HTMLElement {
            // return null to the grid, as we don't want it responsible for rendering
            return null;
        }

        public destroy(): void {
            ReactDOM.unmountComponentAtNode(this.eParentElement);
        }

        public refresh(params: any): void {
        }

    }

    return ReactCellRenderer;

}