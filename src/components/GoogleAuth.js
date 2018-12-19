import React from 'react';

class GoogleAuth extends React.Component {

    state = {
        isSignedin: null
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '00000', // Paste google clientId
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({
                    isSignedin: this.auth.isSignedin.get()
                })
                this.auth.isSignedin.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = () => {
        this.setState({ isSignedin: this.auth.isSignedin.get() })
    }

    renderAuthButton() {
        if(this.state.isSignedin === null) {
            return <div>I don't know if we are signed in</div>
        } else if (this.state.isSignedin) {
            return <div>I am signed in</div>
        } else {
            return <div>I am not singed in!</div>
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

export default GoogleAuth
