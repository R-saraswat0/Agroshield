import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import SupplierSidebar from "../components/SupplierSidebar";
import ManagerNavBar from "../components/ManagerNavBar";
import { FaBoxes, FaUsers, FaChartLine, FaDownload } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { API_URL } from "../config/api";

/* ================= PDF STYLES ================= */

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#f3f4f6" },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#1f2937",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    width: "30%",
  },
  cardTitle: { fontSize: 14, color: "#4b5563", marginBottom: 5 },
  cardValue: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  chartContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
  },
  chart: { height: 200, width: "100%" },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "right",
    color: "#4b5563",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#4b5563",
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
});

/* ================= PDF COMPONENT ================= */

const SupplierAnalyticsPDF = ({
  analyticsData,
  barChartImage,
  lineChartImage,
}) => {
  const totalUnits =
    analyticsData?.mostSoldMaterial?.reduce(
      (acc, item) => acc + item.unitsSold,
      0
    ) || 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          Generated on: {new Date().toLocaleString()}
        </Text>

        <Text style={styles.title}>Supplier Analytics Report</Text>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Most Sold Supplier</Text>
            <Text style={styles.cardValue}>
              {analyticsData?.mostSoldSupplier?.name || "N/A"}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Units Sold</Text>
            <Text style={styles.cardValue}>{totalUnits}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Orders</Text>
            <Text style={styles.cardValue}>{totalUnits}</Text>
          </View>
        </View>

        {barChartImage && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Most Sold Materials</Text>
            <Image style={styles.chart} src={barChartImage} />
          </View>
        )}

        {lineChartImage && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Sales Trend</Text>
            <Image style={styles.chart} src={lineChartImage} />
          </View>
        )}

        <Text style={styles.footer}>
          © {new Date().getFullYear()} SMART AGRIGUARD. All rights reserved.
        </Text>
      </Page>
    </Document>
  );
};

/* ================= MAIN COMPONENT ================= */

const SupplierAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [barChartImage, setBarChartImage] = useState(null);
  const [lineChartImage, setLineChartImage] = useState(null);
  const [pdfReady, setPdfReady] = useState(false);

  /* ========== FETCH DATA ========== */

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!userData?.token) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          `${API_URL}/supplier/analytics`,
          {
            headers: { Authorization: `Bearer ${userData.token}` },
          }
        );

        setAnalyticsData(response.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);

        setError("Using demo data. Backend not connected.");

        setAnalyticsData({
          mostSoldMaterial: [
            { name: "Fertilizer A", unitsSold: 150 },
            { name: "Pesticide B", unitsSold: 120 },
            { name: "Seed C", unitsSold: 90 },
          ],
          mostSoldSupplier: { name: "Supplier X" },
          salesTrend: [100, 120, 150, 130, 170, 160],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const mostSoldMaterial = analyticsData?.mostSoldMaterial || [];
  const mostSoldSupplier = analyticsData?.mostSoldSupplier || {};
  const salesTrend = analyticsData?.salesTrend || [];

  const totalUnits = mostSoldMaterial.reduce(
    (acc, item) => acc + item.unitsSold,
    0
  );

  /* ========== CHART DATA ========== */

  const barChartData = {
    labels: mostSoldMaterial.map((item) => item.name),
    datasets: [
      {
        label: "Units Sold",
        data: mostSoldMaterial.map((item) => item.unitsSold),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales Trend",
        data: salesTrend,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  /* ========== GENERATE PDF CHART IMAGES ========== */

  useEffect(() => {
    if (!analyticsData) return;

    const barCanvas = document.createElement("canvas");
    barCanvas.width = 600;
    barCanvas.height = 300;

    const barChart = new ChartJS(barCanvas, {
      type: "bar",
      data: barChartData,
      options: { responsive: false, animation: false },
    });

    setBarChartImage(barCanvas.toDataURL());
    barChart.destroy();

    const lineCanvas = document.createElement("canvas");
    lineCanvas.width = 600;
    lineCanvas.height = 300;

    const lineChart = new ChartJS(lineCanvas, {
      type: "line",
      data: lineChartData,
      options: { responsive: false, animation: false },
    });

    setLineChartImage(lineCanvas.toDataURL());
    lineChart.destroy();
  }, [analyticsData]);

  useEffect(() => {
    if (barChartImage && lineChartImage) {
      setPdfReady(true);
    }
  }, [barChartImage, lineChartImage]);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100">
      <ManagerNavBar />
      <div className="flex h-screen">
        <SupplierSidebar />

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-28">

            {loading ? (
              <div className="flex flex-col items-center justify-center h-96">
                <BiLoaderCircle
                  className="animate-spin text-green-600"
                  size={64}
                />
                <p className="mt-4 text-gray-600 text-lg">
                  Loading analytics...
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-700">
                      Supplier Analytics
                    </h1>
                    {error && (
                      <p className="text-yellow-600 text-sm mt-1">
                        {error}
                      </p>
                    )}
                  </div>

                  {pdfReady && (
                    <PDFDownloadLink
                      document={
                        <SupplierAnalyticsPDF
                          analyticsData={analyticsData}
                          barChartImage={barChartImage}
                          lineChartImage={lineChartImage}
                        />
                      }
                      fileName="supplier_analytics.pdf"
                    >
                      {({ loading }) => (
                        <button
                          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded flex items-center"
                          disabled={loading}
                        >
                          <FaDownload className="mr-2" />
                          {loading
                            ? "Loading document..."
                            : "Download PDF"}
                        </button>
                      )}
                    </PDFDownloadLink>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    title="Most Sold Supplier"
                    value={mostSoldSupplier.name}
                    icon={<FaUsers size={24} />}
                  />
                  <StatCard
                    title="Total Units Sold"
                    value={totalUnits}
                    icon={<FaBoxes size={24} />}
                  />
                  <StatCard
                    title="Total Orders"
                    value={totalUnits}
                    icon={<FaChartLine size={24} />}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ChartCard title="Most Sold Material">
                    <Bar data={barChartData} />
                  </ChartCard>

                  <ChartCard title="Sales Trend">
                    <Line data={lineChartData} />
                  </ChartCard>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-full">{icon}</div>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
    <h2 className="text-lg font-medium text-gray-700 mb-6">{title}</h2>
    <div className="h-64">{children}</div>
  </div>
);

export default SupplierAnalytics;
