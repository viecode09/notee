import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import NoteeTableRow from './NoteeTableRow.react.js'

// props
// columns: ['id', 'slug', ...]
// contents: this.state.categories(array)
// store: CategoryStore
// actions: CategoryActions
// constants: CategoryConstants
// displayBar: this.displaySnackBar
// ajaxLoaded: this.ajaxCategoryLoaded

export default class NoteeTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Table
                className="mt_20"
                style={{overflow: "scroll"}}
                selectable={false}
                fixedHeader={true}>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        {this.props.columns.map((column)=>{
                            return (
                                <TableHeaderColumn key={column.id}>{column}</TableHeaderColumn>
                            );
                        })}
                        <TableHeaderColumn>/</TableHeaderColumn>
                        <TableHeaderColumn>/</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.contents.map((content)=>{
                        return (
                            <NoteeTableRow
                                columns={this.props.columns}
                                content={content} 
                                key={content.id}
                                store={this.props.store}
                                actions={this.props.actions}
                                constants={this.props.constants}
                                ajaxLoad={this.props.ajaxLoad}
                                displaySnackBar={this.props.displaySnackBar}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}
