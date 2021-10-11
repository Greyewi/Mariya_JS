import { connect } from "react-redux";
import Table from './table'
import {
  checkedLinesSelector,
  errorSelector,
  handleAddNewLine,
  handleChangeSort,
  handleCheckTableRow,
  handleEditTable,
  handleFetchTableList,
  handleFilterTable,
  handleRemoveLine,
  handleTableError,
  handleTableLoading,
  handleFieldName,
  handleNewValue,
  handleClearCheckedLines,
  handleFetchByMiddleware,
  isLoaderSelector,
  searchStringSelector,
  sortSelector,
  tableDataSelector,
  fieldNameSelector,
  newValueSelector,
} from "../../ducks/table";

export default connect(
  (state) => ({
    tableData: tableDataSelector(state),
    checkedLines: checkedLinesSelector(state),
    searchString: searchStringSelector(state),
    isLoader: isLoaderSelector(state),
    error: errorSelector(state),
    sort: sortSelector(state),
    fieldName: fieldNameSelector(state),
    newValue: newValueSelector(state),
  }),
  {
    handleFetchTableList,
    handleAddNewLine,
    handleChangeSort,
    handleRemoveLine,
    handleFilterTable,
    handleEditTable,
    handleCheckTableRow,
    handleTableLoading,
    handleTableError,
    handleNewValue,
    handleFieldName,
    handleClearCheckedLines,
    handleFetchByMiddleware,
  }
)(Table);
