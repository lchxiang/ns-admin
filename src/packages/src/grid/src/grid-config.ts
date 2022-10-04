//默认配置
const defaultGridConfig = {
  border: 'none',
  stripe: true,
  highlightHoverRow: true,
  showOverflow: 'tooltip',
  showHeaderOverflow: false,
  autoResize: true,
  resizable: false,
  pagerConfig: {
    enabled: true,
    pageSize: 10,
    border: true,
    layouts: ['PrevPage', 'JumpNumber', 'NextPage', 'Sizes', 'Total'],
    pageSizes: [10, 20, 50, 100, 500]
  },
  proxyConfig: {
    autoLoad: true,
    props: {
      result: 'data.list',
      total: 'data.total'
    },
    ajax: {
      query: tableAjax
    }
  },
  rowConfig: {
    useKey: false
  },
  columnConfig: {
    minWidth: '100px',
    resizable: false
  }
}
