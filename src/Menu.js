// Menu.js

import React from 'react';
import lunr from 'lunr';
import store from "../redux/store";
import { connect } from "react-redux";

/* this is exported for redux and needs to be imported as follows:
 * import StaticMenu from './Menu';
 */
class StaticMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: null,
            lunrIndex: null,
            results: [],
        };

    /* on mount, generate lunr index from docstore */
    componentDidMount() {
        const { docstore } = this.props;
        const lunrIndex = this.generateLunrIndex(docstore);
        this.setState({lunrIndex: lunrIndex});
    }

    /* when docstore is updated, re-generate lunr index */
    componentDidUpdate(prevProps) {
        if (this.props.docstore !== prevProps.docstore) {
            const { docstore } = this.props;
            const lunrIndex = this.generateLunrIndex(docstore);
            this.setState({lunrIndex: lunrIndex});
        }
    }

    generateLunrIndex = (docstore) => {
        const lunrIndex = (docstore) ?
            lunr(function() {
                this.field('hdr');
                this.field('txt');
                docstore.map(({hdr, txt}, i) => this.add({id: i, hdr: hdr, txt: txt}));
            })
            : null
        ;
        return lunrIndex;
    }

    handleSearch = (e) => {
        const searchQuery = e.target.value || '';
        const {docstore} = this.props;
        const {lunrIndex} = this.state;

        const results = lunrIndex.search(searchQuery)
            .map(({ matchData, ref, ...rest }) => {
                const {metadata} = (matchData) ? matchData : {};
                return {
                    terms: Object.keys(metadata),
                    ref,
                    item: docstore[parseInt(ref)], // id is idx of item in array
                    ...rest
                };
            })
        ;
        this.setState({
            results: results,
            searchQuery: searchQuery,
        });
    }
    
    render() {
        return (
            <div />
        );
    }
    
}

/* this connects the component to redux store, delivering updates to props of the component */
const mapStateToProps = (state, ownProps) => {
    const {docs} = state;
    return {
        docstore: docs
    }
};

export default connect(mapStateToProps)(StaticMenu); // redux connect wrapper


