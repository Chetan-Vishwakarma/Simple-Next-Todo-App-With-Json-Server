import React, { useCallback, useRef, useState } from 'react';
import DataGrid, {
  Column, FilterRow, HeaderFilter, Search, SearchPanel,
} from 'devextreme-react/data-grid';
import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import CheckBox, { CheckBoxTypes } from 'devextreme-react/check-box';

const saleAmountEditorOptions = { format: 'currency', showClearButton: true };
const filterLabel = { 'aria-label': 'Filter' };

const applyFilterTypes = [{
  key: 'auto',
  name: 'Immediately',
}, {
  key: 'onClick',
  name: 'On Button Click',
}];

const saleAmountHeaderFilter = [{
  text: 'Less than $3000',
  value: ['SaleAmount', '<', 3000],
}, {
  text: '$3000 - $5000',
  value: [
    ['SaleAmount', '>=', 3000],
    ['SaleAmount', '<', 5000],
  ],
}, {
  text: '$5000 - $10000',
  value: [
    ['SaleAmount', '>=', 5000],
    ['SaleAmount', '<', 10000],
  ],
}, {
  text: '$10000 - $20000',
  value: [
    ['SaleAmount', '>=', 10000],
    ['SaleAmount', '<', 20000],
  ],
}, {
  text: 'Greater than $20000',
  value: ['SaleAmount', '>=', 20000],
}];

const getOrderDay = (rowData) => (new Date(rowData.OrderDate)).getDay();

function calculateFilterExpression(value, target) {
  const column = this;

  if (target === 'headerFilter' && value === 'weekends') {
    return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
  }

  return column.defaultCalculateFilterExpression(value, target);
}

const orderHeaderFilter = (data) => {
  data.dataSource.postProcess = (results) => {
    results.push({
      text: 'Weekends',
      value: 'weekends',
    });

    return results;
  };
};


function Contact() {

    const [showFilterRow, setShowFilterRow] = useState(true);
    const [showHeaderFilter, setShowHeaderFilter] = useState(true);
    const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key);
    const dataGridRef = useRef(null);

    const clearFilter = useCallback(() => {
        dataGridRef.current.instance.clearFilter();
    }, []);

    const onShowFilterRowChanged = useCallback((e) => {
        setShowFilterRow(e.value);
        clearFilter();
    }, [clearFilter]);

    const onShowHeaderFilterChanged = useCallback((e) => {
        setShowHeaderFilter(e.value);
        clearFilter();
    }, [clearFilter]);

    const onCurrentFilterChanged = useCallback((e) => {
        setCurrentFilter(e.value);
    }, []);

    return (
        <div>
            <DataGrid
                id="gridContainer"
                ref={dataGridRef}
                dataSource={orders}
                keyExpr="ID"
                showBorders={true}>
                <FilterRow
                    visible={showFilterRow}
                    applyFilter={currentFilter} />
                <HeaderFilter visible={showHeaderFilter} />
                <SearchPanel
                    visible={true}
                    width={240}
                    placeholder="Search..." />
                <Column
                    dataField="OrderNumber"
                    width={140} 
                    caption="Title">
                    <HeaderFilter groupInterval={10000} />
                </Column>
                <Column
                    dataField="OrderDate"
                    alignment="right"
                    dataType="date"
                    width={120}
                    calculateFilterExpression={calculateFilterExpression}>
                    <HeaderFilter dataSource={orderHeaderFilter} />
                </Column>
                <Column
                    dataField="DeliveryDate"
                    alignment="right"
                    dataType="datetime"
                    format="M/d/yyyy, HH:mm"
                    width={180} />
                <Column
                    dataField="SaleAmount"
                    alignment="right"
                    dataType="number"
                    format="currency"
                    editorOptions={saleAmountEditorOptions}>
                    <HeaderFilter dataSource={saleAmountHeaderFilter} />
                </Column>
                <Column dataField="Employee" />
                <Column
                    dataField="CustomerStoreCity"
                    caption="City">
                    <HeaderFilter>
                        <Search enabled={true} />
                    </HeaderFilter>
                </Column>
            </DataGrid>
        
        </div>
    )
}

export default Contact


const orders = [{
    ID: 1,
    OrderNumber: 35703,
    OrderDate: '2017/04/10',
    DeliveryDate: '2017/04/13 9:00',
    SaleAmount: 11800,
    Terms: '15 Days',
    CustomerStoreCity: 'Los Angeles, CA',
    Employee: 'Harv Mudd',
  }, {
    ID: 4,
    OrderNumber: 35711,
    OrderDate: '2017/01/12',
    DeliveryDate: '2017/01/13 9:00',
    SaleAmount: 16050,
    Terms: '15 Days',
    CustomerStoreCity: 'San Jose, CA',
    Employee: 'Jim Packard',
  },
  ];
  