class SayforFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last_updated: "...",
        };

        this.loadLastUpdated();
    }

    loadLastUpdated() {
        ky.default("/api/lastupdated").json().then((res) => {
            this.setState(res);
        });
    }

    render() {
        return (
            <div id="wrap_footer" className="flrow">
                <div className="flitem">
                    <span>&copy;copyright </span>
                    <a href="https://github.com/cranpun/sayfor">
                        cranpun/sayfor
                    </a>
                </div>
                <div className="flitem">
                    last updated : {this.state.last_updated}
                </div>
            </div >
        );
    }
}

ReactDOM.render(
    <SayforFooter />,
    document.querySelector('#footer_content')
);