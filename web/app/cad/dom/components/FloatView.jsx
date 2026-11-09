import React from 'react';
import Folder from 'ui/components/Folder';
import ls from './FloatView.css';
import connect from 'ui/connect';
import mapContext from 'ui/mapContext';
import MaterialIcon from 'ui/components/MaterialIcon';
import ToolButton from 'ui/components/ToolButton';

class FloatView extends React.Component {

  
  constructor(props) {
    super();
    this.state = {
      selected: props.initialView
    };
  }
  

  render() {
    const {views, getDescriptor} = this.props;

    function renderedIcon(icon) {
      if (typeof icon === 'string') {
        return <MaterialIcon fw icon={icon}/>;
      }  else {
        const I = icon;
        return <I />;
      }
    }

    function view(id) {
      const {title, icon, Component} = getDescriptor(id);


      return <Folder className={ls.folder} title={<span> {renderedIcon(icon)} {title}</span>}>
        <div className={ls.folderContent}><Component/></div>
      </Folder>;
    }



    const selected = this.state.selected;
    
    return <div className={ls.root}>
      <div className={ls.tabs}>
        {views.map(tabId => <ToolButton pressed={selected === tabId} 
                                        key={tabId}
                                        className='float-view-btn'
                                        data-view={tabId}
                                        onClick={() => this.setState({selected: selected === tabId ? null : tabId})}>
          {renderedIcon(getDescriptor(tabId).icon)}
        </ToolButton>)}
      </div>
      
      {selected && view(selected)}
        
    </div>;
  }
}

export default connect(state => state.ui.floatViews.map(views => ({views})))(
  mapContext(ctx => ({
    getDescriptor: ctx.services.ui.getFloatView,
    initialView: ctx.projectService.hints.FloatView || null
  }))(FloatView)
);