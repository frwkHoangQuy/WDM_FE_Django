import { useEffect, useState, useMemo } from 'react';
import { customerInfo, weddingInfo } from '../../utils/billTable';
import { getFoodsOrder, getServicesOrder } from '../../api/wedding.api';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import resolveDate from '../../utils/resolveDate';
import resolveCurrency from '../../utils/resolveCurrency';

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  h1: {
    fontWeight: 'bold',
    fontSize: '30px',
    textAlign: 'center',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  section: {
    marginTop: 20,
  },
  table: {
    marginTop: 10,
  },
  row: {
    border: '1px solid black',
    flexDirection: 'row',
  },
  cell: {
    padding: 7,
    flex: '1 1 0px',
    textAlign: 'center',
    borderRight: '1px solid black',
    fontSize: '12px',
  },
  paidDate: {
    marginTop: 20,
    fontSize: '12px',
  },
  totalPrice: {
    marginTop: 20,
    fontSize: '15px',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const BillPdf = ({ orderInfo, billModalState }) => {
  const [food, setFood] = useState();
  const [service, setService] = useState();

  const foodTotalPrice = useMemo(() => {
    return (
      food &&
      food
        .map(({ count, food_price }) => count * food_price)
        .reduce((acc, item) => acc + item, 0)
    );
  }, [food]);

  const serviceTotalPrice = useMemo(() => {
    return (
      service &&
      service
        .map(({ count, service_price }) => count * service_price)
        .reduce((acc, item) => acc + item, 0)
    );
  }, [service]);

  const fetchData = async () => {
    const fetchedFood = await getFoodsOrder(orderInfo.id);
    const fetchedService = await getServicesOrder(orderInfo.id);
    setFood(fetchedFood.data);
    setService(fetchedService.data);
  };

  useEffect(() => {
    if (billModalState) fetchData();
  }, [billModalState]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Bill</Text>

        <View style={styles.section}>
          <Text style={styles.h2}>Customer Information</Text>
          <View style={styles.table}>
            {customerInfo.map(({ title, key, type }, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{index + 1}</Text>
                <Text style={styles.cell}>{title}</Text>
                <Text style={styles.cell}>
                  {type === 'date'
                    ? resolveDate(orderInfo[key])
                    : orderInfo[key]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Wedding Information</Text>
          <View style={styles.table}>
            {weddingInfo.map(({ title, key, type }, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{index + 1}</Text>
                <Text style={styles.cell}>{title}</Text>
                <Text style={styles.cell}>
                  {type === 'date'
                    ? resolveDate(orderInfo[key])
                    : orderInfo[key]}
                  {resolveCurrency(key)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.paidDate}>
          Paid date: {resolveDate(orderInfo.payment_date)}
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Food Information</Text>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>Order</Text>
              <Text style={styles.cell}>Food name</Text>
              <Text style={styles.cell}>Food price</Text>
              <Text style={styles.cell}>Quantity</Text>
            </View>
            {food &&
              food.map(({ food_name, food_price, count }, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{index + 1}</Text>
                  <Text style={styles.cell}>{food_name}</Text>
                  <Text style={styles.cell}>{food_price}$</Text>
                  <Text style={styles.cell}>{count}</Text>
                </View>
              ))}
          </View>
        </View>
        <Text style={styles.totalPrice}>Total: {foodTotalPrice}$</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Service Information</Text>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>Order</Text>
              <Text style={styles.cell}>Service name</Text>
              <Text style={styles.cell}>Service price</Text>
              <Text style={styles.cell}>Quantity</Text>
            </View>
            {service &&
              service.map(({ service_name, service_price, count }, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{index + 1}</Text>
                  <Text style={styles.cell}>{service_name}</Text>
                  <Text style={styles.cell}>{service_price}$</Text>
                  <Text style={styles.cell}>{count}</Text>
                </View>
              ))}
          </View>
        </View>
        <Text style={styles.totalPrice}>Total: {serviceTotalPrice}$</Text>
      </Page>
    </Document>
  );
};

export default BillPdf;
