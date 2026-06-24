import * as React from 'react';
import {
  DataGridPremium,
  GridDataSource,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
  GridGetRowsResponse,
} from '@mui/x-data-grid-premium';
import { useMockServer } from '@mui/x-data-grid-generator';

export default function ServerSideRowGroupingExpansionOnSort() {
  const apiRef = useGridApiRef();

  const { fetchRows, columns } = useMockServer<GridGetRowsResponse>(
    { dataSet: 'Movies' },
    {},
  );

  const dataSource: GridDataSource = React.useMemo(() => {
    return {
      getRows: async (params) => {
        const urlParams = new URLSearchParams({
          paginationModel: JSON.stringify(params.paginationModel),
          filterModel: JSON.stringify(params.filterModel),
          sortModel: JSON.stringify(params.sortModel),
          groupKeys: JSON.stringify(params.groupKeys),
          groupFields: JSON.stringify(params.groupFields),
        });
        const getRowsResponse = await fetchRows(
          `https://mui.com/x/api/data-grid?${urlParams.toString()}`,
        );
        return {
          rows: getRowsResponse.rows,
          rowCount: getRowsResponse.rowCount,
        };
      },
      getGroupKey: (row) => row.group,
      getChildrenCount: (row) => row.descendantCount,
    };
  }, [fetchRows]);

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ['company', 'director'],
      },
    },
  });

  return (
    <div style={{ width: '100%', height: 400, position: 'relative' }}>
      <DataGridPremium
        columns={columns}
        dataSource={dataSource}
        apiRef={apiRef}
        initialState={initialState}
        disablePivoting
      />
    </div>
  );
}
