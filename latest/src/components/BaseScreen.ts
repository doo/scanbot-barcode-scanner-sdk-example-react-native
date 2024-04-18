import React from 'react';

export class BaseScreen extends React.Component<any> {
  constructor(props: any) {
    super(props);

    if (this.props.navigation) {
      this.props.navigation.addListener('focus', () => {
        this.onScreenFocused();
      });
    }
  }

  onScreenFocused() {}

  refresh() {
    this.forceUpdate();
  }

  public pushPage(name: string) {
    if (this.props.navigation) {
      this.props.navigation.push(name);
    }
  }

  public progressVisible = false;

  public showProgress() {
    this.progressVisible = true;
    this.refresh();
  }

  public hideProgress() {
    this.progressVisible = false;
    this.refresh();
  }
}
