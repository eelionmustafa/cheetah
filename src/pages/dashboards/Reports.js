import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const MotionPaper = motion(Paper);

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 139 },
  { name: 'Mar', sales: 2000, orders: 980 },
  { name: 'Apr', sales: 2780, orders: 390 },
  { name: 'May', sales: 1890, orders: 480 },
  { name: 'Jun', sales: 2390, orders: 380 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Books', value: 300 },
  { name: 'Home', value: 200 },
  { name: 'Sports', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Reports = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('month');

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={3}
      sx={{ p: 3 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('dashboard.reports')}
        </Typography>
        <FormControl sx={{ minWidth: 200, mb: 3 }}>
          <InputLabel>{t('common.timeRange')}</InputLabel>
          <Select
            value={timeRange}
            label={t('common.timeRange')}
            onChange={handleTimeRangeChange}
          >
            <MenuItem value="week">{t('common.week')}</MenuItem>
            <MenuItem value="month">{t('common.month')}</MenuItem>
            <MenuItem value="year">{t('common.year')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Sales Overview */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.salesOverview')}
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                  width={800}
                  height={300}
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name={t('dashboard.sales')}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    name={t('dashboard.orders')}
                  />
                </LineChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.categoryDistribution')}
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <PieChart width={400} height={300}>
                  <Pie
                    data={categoryData}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.topProducts')}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('common.product')}</TableCell>
                      <TableCell>{t('common.category')}</TableCell>
                      <TableCell align="right">{t('common.sales')}</TableCell>
                      <TableCell align="right">{t('common.revenue')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Smartphone X</TableCell>
                      <TableCell>Electronics</TableCell>
                      <TableCell align="right">150</TableCell>
                      <TableCell align="right">$15,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Running Shoes</TableCell>
                      <TableCell>Sports</TableCell>
                      <TableCell align="right">120</TableCell>
                      <TableCell align="right">$3,600</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Coffee Maker</TableCell>
                      <TableCell>Home</TableCell>
                      <TableCell align="right">100</TableCell>
                      <TableCell align="right">$2,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MotionPaper>
  );
};

export default Reports; 