import * as React from 'react';
import { Modal, Button, Icon, Row, Col } from 'patternfly-react';
import { AuthStrategy } from '../../types/Auth';
import { LoginSession } from '../../store/Store';
import * as API from '../../services/Api';
import authenticationConfig from '../../config/authenticationConfig';

type SessionTimeoutProps = {
  onLogout: () => void;
  onExtendSession: (session: LoginSession) => void;
  onDismiss: () => void;
  show: boolean;
  timeOutCountDown: number;
};

export class SessionTimeout extends React.Component<SessionTimeoutProps, {}> {
  constructor(props: SessionTimeoutProps) {
    super(props);
  }

  render() {
    return (
      <Modal
        backdrop="static"
        className={'message-dialog-pf'}
        show={this.props.show}
        enforceFocus={true}
        aria-modal={true}
      >
        <Modal.Body>
          <Row style={{ paddingTop: '25px' }}>
            <Col xs={12} sm={1} md={1} lg={1} />
            <Col xs={12} sm={1} md={1} lg={1} style={{ paddingLeft: '10px' }}>
              <Icon name="warning-triangle-o" type="pf" style={{ fontSize: '48px' }} />
            </Col>
            <Col xs={12} sm={10} md={10} lg={10}>
              {authenticationConfig.strategy === AuthStrategy.login
                ? this.textForLoginStrategy()
                : this.textForOpenshiftStrategy()}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <React.Fragment>
            <Button bsStyle={'default'} onClick={this.props.onLogout}>
              Log Out
            </Button>
            {authenticationConfig.strategy === AuthStrategy.login ? (
              <Button autoFocus={true} bsStyle={'primary'} onClick={this.extendSessionHandler}>
                Continue Session
              </Button>
            ) : (
              <Button autoFocus={true} bsStyle={'primary'} onClick={this.props.onDismiss}>
                OK
              </Button>
            )}
          </React.Fragment>
        </Modal.Footer>
      </Modal>
    );
  }

  private extendSessionHandler = async () => {
    try {
      const session = await API.extendSession();
      this.props.onExtendSession(session.data);
    } catch (err) {
      console.error(err);
    }
  };

  private textForLoginStrategy = () => {
    return (
      <p className={'lead'}>
        Your session will timeout in {this.props.timeOutCountDown.toFixed()} seconds.
        <br />
        Would you like to extend your session?
      </p>
    );
  };

  private textForOpenshiftStrategy = () => {
    return (
      <p className={'lead'}>
        Your session will timeout in {this.props.timeOutCountDown.toFixed()} seconds.
        <br />
        You will need to re-login with your cluster credentials. Please, save your changes, if any.
      </p>
    );
  };
}
