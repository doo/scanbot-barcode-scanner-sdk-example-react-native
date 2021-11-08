import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BaseScreen extends React.Component<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
