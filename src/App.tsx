import React, { useState, useMemo } from 'react';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const ItemList = () => {
  // 商品数据
  const [items, setItems] = useState([
    { id: 1, name: 'CPU', model: 'Intel i7', price: 50, chengben: 40 },
    { id: 2, name: '显卡', model: 'NVIDIA GTX 1660', price: 30, chengben: 25 },
    { id: 3, name: '主板', model: 'ASUS B450', price: 20, chengben: 15 },
    { id: 4, name: '内存', model: 'Kingston 8GB', price: 40, chengben: 30 },
    { id: 5, name: '固态', model: 'Samsung 970 EVO', price: 25, chengben: 20 },
    { id: 6, name: '散热', model: 'Cooler Master', price: 15, chengben: 10 },
    { id: 7, name: '电源', model: 'Corsair 550W', price: 15, chengben: 10 },
    { id: 8, name: '机箱', model: 'NZXT H510', price: 15, chengben: 10 },
  ]);

  // 分页状态
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });

  // 计算总价
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price, 0);
  }, [items]);

  // DataGrid 的列定义
  const columns = [
    { field: 'name', headerName: '名称', width: 150, editable: true },
    { field: 'model', headerName: '具体型号', width: 200, editable: true }, // 新增“具体型号”列
    { field: 'price', headerName: '单价', width: 150, editable: true },
    { field: 'chengben', headerName: '成本', width: 150, editable: true },
  ];

  // 更新行数据的处理函数
  const handleProcessRowUpdate = (newRow: { price: number; chengben: number; id: number; model: any; }) => {
    if (isNaN(newRow.price) || isNaN(newRow.chengben) || newRow.price < 0 || newRow.chengben < 0) {
      alert('请输入有效的数字');
      return newRow;
    }

    const updatedItems = items.map(item =>
      item.id === newRow.id
        ? { ...item, price: Number(newRow.price), chengben: Number(newRow.chengben), model: newRow.model }
        : item
    );
    setItems(updatedItems);
    return newRow;
  };

  // 添加新行的处理函数
  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1,
      name: `新商品 ${items.length + 1}`,
      model: '', // 默认空型号
      price: 0,
      chengben: 0,
    };
    setItems([...items, newItem]);
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* 添加新行按钮 */}
      <Button variant="contained" onClick={handleAddRow} sx={{ marginBottom: 2 }}>
        添加商品
      </Button>
      {/* 商品列表 */}
      <DataGrid
        rows={items}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        processRowUpdate={handleProcessRowUpdate}
        hideFooter
      />
      {/* 总价显示 */}
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h6">总价: ¥{total}</Typography>
      </Box>
    </Box>
  );
};

export default ItemList;
