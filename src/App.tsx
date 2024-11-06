import React, { useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const ItemList = () => {
  // 商品数据
  const [items, setItems] = useState([
    { id: 1, name: 'CPU', model: '', price: 0, chengben: 0 },
    { id: 2, name: '显卡', model: '', price: 0, chengben: 0 },
    { id: 3, name: '主板', model: '', price: 0, chengben: 0 },
    { id: 4, name: '内存', model: '', price: 0, chengben: 0 },
    { id: 5, name: '固态', model: '', price: 0, chengben: 0 },
    { id: 6, name: '散热', model: '如图所示', price: 0, chengben: 0 },
    { id: 7, name: '电源', model: '', price: 0, chengben: 0 },
    { id: 8, name: '机箱', model: '如图所示', price: 0, chengben: 0 },
    { id: 9, name: '送货上门', model: '', price: 3000, chengben: 0 },
  ]);

  // 计算总价
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price, 0);
  }, [items]);

  // 计算总成本
  const totalCost = useMemo(() => {
    return items.reduce((acc, item) => acc + item.chengben, 0);
  }, [items]);

  // DataGrid 的列定义
  const columns = [
    { field: 'name', headerName: '名称', width: 150, editable: true },
    { field: 'model', headerName: '具体型号', width: 200, editable: true },
    { field: 'price', headerName: '单价', width: 100, editable: true },
    { field: 'chengben', headerName: '成本', width: 100, editable: true },
  ];

  // 更新行数据的处理函数
  const handleProcessRowUpdate = (newRow: { price: number; chengben: number; model: string; name: string; id: number; }) => {
    // 输入验证：确保价格和成本为有效数字
    if (isNaN(newRow.price) || isNaN(newRow.chengben) || newRow.price < 0 || newRow.chengben < 0) {
      alert('请输入有效的数字');
      return newRow;
    }

    // 更新行数据，确保所有字段都被正确更新
    const updatedItems = items.map(item =>
      item.id === newRow.id
        ? { ...item, name: newRow.name, price: Number(newRow.price), chengben: Number(newRow.chengben), model: newRow.model }
        : item
    );
    setItems(updatedItems);
    return newRow;
  };

  // 添加新行的处理函数
  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1, // 生成新的 id
      name: `新商品 ${items.length + 1}`, // 默认名称
      model: '', // 默认具体型号
      price: 0, // 默认单价
      chengben: 0, // 默认成本
    };

    setItems([...items, newItem]); // 添加新行
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* 标题 */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        东京DM电脑
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        全新正品 一年质保
      </Typography>

      {/* 商品列表 */}
      <DataGrid
        rows={items}
        columns={columns}
        hideFooter // 隐藏分页信息
        processRowUpdate={handleProcessRowUpdate} // 处理行更新
      />

      {/* 显示总价和总成本价 */}
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">总价: {total}日元</Typography>
        <Typography variant="h6">总成本: {totalCost}日元</Typography>
      </Box>

      {/* 添加新行按钮 */}
      <Button variant="contained" onClick={handleAddRow} sx={{ margin: 2 }}>
        添加商品
      </Button>
    </Box>
  );
};

export default ItemList;
