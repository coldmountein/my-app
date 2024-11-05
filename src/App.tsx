import React, { useState, useMemo } from 'react';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const ItemList = () => {
  // 商品数据
  const [items, setItems] = useState([
    { id: 1, name: 'CPU', price: 50, chengben: 40 },
    { id: 2, name: '显卡', price: 30, chengben: 25 },
    { id: 3, name: '主板', price: 20, chengben: 15 },
    { id: 4, name: '内存', price: 40, chengben: 30 },
    { id: 5, name: '固态', price: 25, chengben: 20 },
    { id: 6, name: '散热', price: 15, chengben: 10 },
    { id: 7, name: '电源', price: 15, chengben: 10 },
    { id: 8, name: '机箱', price: 15, chengben: 10 },
  ]);

  // 分页状态
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });

  // 计算总价
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price, 0);
  }, [items]);

  // DataGrid 的列定义
  const columns = [
    { field: 'name', headerName: '名称', width: 200, editable: true },
    { field: 'price', headerName: '单价', width: 200, editable: true },
    { field: 'chengben', headerName: '成本', width: 200, editable: true },
  ];

  // 更新行数据的处理函数
  const handleProcessRowUpdate = (newRow: { id: number; price: any; chengben: any; }) => {
    // 输入验证：确保价格和成本为有效数字
    if (isNaN(newRow.price) || isNaN(newRow.chengben) || newRow.price < 0 || newRow.chengben < 0) {
      alert('请输入有效的数字');
      return newRow; // 返回未更新的行
    }

    const updatedItems = items.map(item =>
      item.id === newRow.id ? { ...item, price: Number(newRow.price), chengben: Number(newRow.chengben) } : item
    );
    setItems(updatedItems);
    return newRow;
  };

  // 添加新行的处理函数
  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1, // 生成新的 id
      name: `新商品 ${items.length + 1}`, // 默认名称
      price: 0, // 默认单价
      chengben: 0, // 默认成本
    };
    setItems([...items, newItem]); // 添加新行
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* 添加新行按钮 */}
      {/* 商品列表 */}
      <DataGrid
        rows={items}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel} // 更新分页状态
        processRowUpdate={handleProcessRowUpdate} // 处理行更新
        hideFooter // 隐藏分页信息
      />
      {/* 总价显示 */}
      <Button variant="contained" onClick={handleAddRow} sx={{ marginBottom: 2 }}>
        添加商品
      </Button>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <Typography variant="h6">总价: ¥{total}</Typography>
      </Box>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h6">成本: ¥{total}</Typography>
      </Box>
    </Box>
  );
};

export default ItemList;
