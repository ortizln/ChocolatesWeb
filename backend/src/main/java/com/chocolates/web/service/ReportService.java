package com.chocolates.web.service;

import com.chocolates.web.entity.DailyStat;
import com.chocolates.web.entity.MonthlyStat;
import com.chocolates.web.repository.DailyStatRepository;
import com.chocolates.web.repository.MonthlyStatRepository;
import com.chocolates.web.repository.PageVisitRepository;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportService {

    private final DailyStatRepository dailyStatRepository;
    private final MonthlyStatRepository monthlyStatRepository;
    private final PageVisitRepository pageVisitRepository;

    public byte[] generateDailyReport(LocalDate date, String format) {
        DailyStat stat = dailyStatRepository.findByStatDate(date)
                .orElse(DailyStat.builder().statDate(date).totalVisits(0L).build());
        if ("PDF".equalsIgnoreCase(format)) {
            return generateDailyPdf(stat);
        } else if ("EXCEL".equalsIgnoreCase(format)) {
            return generateDailyExcel(stat);
        }
        throw new RuntimeException("Formato no soportado: " + format);
    }

    public byte[] generateMonthlyReport(int year, int month, String format) {
        MonthlyStat stat = monthlyStatRepository.findByStatYearAndStatMonth(year, month)
                .orElse(MonthlyStat.builder().statYear(year).statMonth(month).build());
        if ("PDF".equalsIgnoreCase(format)) {
            return generateMonthlyPdf(stat);
        } else if ("EXCEL".equalsIgnoreCase(format)) {
            return generateMonthlyExcel(stat);
        }
        throw new RuntimeException("Formato no soportado: " + format);
    }

    public byte[] generateCustomReport(LocalDate from, LocalDate to, String format) {
        List<DailyStat> stats = dailyStatRepository.findByStatDateBetween(from, to);
        if ("PDF".equalsIgnoreCase(format)) {
            return generateCustomPdf(stats, from, to);
        } else if ("EXCEL".equalsIgnoreCase(format)) {
            return generateCustomExcel(stats, from, to);
        }
        throw new RuntimeException("Formato no soportado: " + format);
    }

    private byte[] generateDailyPdf(DailyStat stat) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            document.add(new Paragraph("Reporte Diario - " + stat.getStatDate()));
            document.add(new Paragraph("Visitas totales: " + stat.getTotalVisits()));
            document.add(new Paragraph("Visitantes únicos: " + stat.getUniqueVisitors()));
            document.add(new Paragraph("Productos vistos: " + stat.getProductsViewed()));
            document.add(new Paragraph("Posts leídos: " + stat.getPostsViewed()));
            document.add(new Paragraph("Likes recibidos: " + stat.getLikesReceived()));
            document.add(new Paragraph("Mensajes recibidos: " + stat.getMessagesReceived()));
            document.add(new Paragraph("Nuevos usuarios: " + stat.getNewUsers()));
            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar reporte PDF: " + e.getMessage());
        }
    }

    private byte[] generateMonthlyPdf(MonthlyStat stat) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            document.add(new Paragraph("Reporte Mensual - " + stat.getStatYear() + "/" + stat.getStatMonth()));
            document.add(new Paragraph("Visitas totales: " + stat.getTotalVisits()));
            document.add(new Paragraph("Visitantes únicos: " + stat.getUniqueVisitors()));
            document.add(new Paragraph("Productos vistos: " + stat.getProductsViewed()));
            document.add(new Paragraph("Posts leídos: " + stat.getPostsViewed()));
            document.add(new Paragraph("Likes recibidos: " + stat.getLikesReceived()));
            document.add(new Paragraph("Mensajes recibidos: " + stat.getMessagesReceived()));
            document.add(new Paragraph("Nuevos usuarios: " + stat.getNewUsers()));
            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar reporte PDF: " + e.getMessage());
        }
    }

    private byte[] generateCustomPdf(List<DailyStat> stats, LocalDate from, LocalDate to) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            document.add(new Paragraph("Reporte Personalizado - " + from + " a " + to));
            Table table = new Table(7);
            table.addCell("Fecha");
            table.addCell("Visitas");
            table.addCell("Visitantes");
            table.addCell("Productos");
            table.addCell("Posts");
            table.addCell("Likes");
            table.addCell("Mensajes");
            for (DailyStat stat : stats) {
                table.addCell(stat.getStatDate() != null ? stat.getStatDate().toString() : "");
                table.addCell(String.valueOf(stat.getTotalVisits()));
                table.addCell(String.valueOf(stat.getUniqueVisitors()));
                table.addCell(String.valueOf(stat.getProductsViewed()));
                table.addCell(String.valueOf(stat.getPostsViewed()));
                table.addCell(String.valueOf(stat.getLikesReceived()));
                table.addCell(String.valueOf(stat.getMessagesReceived()));
            }
            document.add(table);
            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar reporte PDF: " + e.getMessage());
        }
    }

    private byte[] generateDailyExcel(DailyStat stat) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reporte Diario");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Métrica");
            header.createCell(1).setCellValue("Valor");
            String[][] data = {
                    {"Fecha", stat.getStatDate() != null ? stat.getStatDate().toString() : ""},
                    {"Visitas totales", String.valueOf(stat.getTotalVisits())},
                    {"Visitantes únicos", String.valueOf(stat.getUniqueVisitors())},
                    {"Productos vistos", String.valueOf(stat.getProductsViewed())},
                    {"Posts leídos", String.valueOf(stat.getPostsViewed())},
                    {"Likes recibidos", String.valueOf(stat.getLikesReceived())},
                    {"Mensajes recibidos", String.valueOf(stat.getMessagesReceived())},
                    {"Nuevos usuarios", String.valueOf(stat.getNewUsers())}
            };
            for (int i = 0; i < data.length; i++) {
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(data[i][0]);
                row.createCell(1).setCellValue(data[i][1]);
            }
            workbook.write(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar reporte Excel: " + e.getMessage());
        }
    }

    private byte[] generateMonthlyExcel(MonthlyStat stat) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reporte Mensual");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Métrica");
            header.createCell(1).setCellValue("Valor");
            String[][] data = {
                    {"Año/Mes", stat.getStatYear() + "/" + stat.getStatMonth()},
                    {"Visitas totales", String.valueOf(stat.getTotalVisits())},
                    {"Visitantes únicos", String.valueOf(stat.getUniqueVisitors())},
                    {"Productos vistos", String.valueOf(stat.getProductsViewed())},
                    {"Posts leídos", String.valueOf(stat.getPostsViewed())},
                    {"Likes recibidos", String.valueOf(stat.getLikesReceived())},
                    {"Mensajes recibidos", String.valueOf(stat.getMessagesReceived())},
                    {"Nuevos usuarios", String.valueOf(stat.getNewUsers())}
            };
            for (int i = 0; i < data.length; i++) {
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(data[i][0]);
                row.createCell(1).setCellValue(data[i][1]);
            }
            workbook.write(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar reporte Excel: " + e.getMessage());
        }
    }

    private byte[] generateCustomExcel(List<DailyStat> stats, LocalDate from, LocalDate to) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reporte Personalizado");
            Row header = sheet.createRow(0);
            String[] columns = {"Fecha", "Visitas", "Visitantes", "Productos", "Posts", "Likes", "Mensajes"};
            for (int i = 0; i < columns.length; i++) {
                header.createCell(i).setCellValue(columns[i]);
            }
            int rowNum = 1;
            for (DailyStat stat : stats) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(stat.getStatDate() != null ? stat.getStatDate().toString() : "");
                row.createCell(1).setCellValue(stat.getTotalVisits() != null ? stat.getTotalVisits() : 0L);
                row.createCell(2).setCellValue(stat.getUniqueVisitors() != null ? stat.getUniqueVisitors() : 0L);
                row.createCell(3).setCellValue(stat.getProductsViewed() != null ? stat.getProductsViewed() : 0L);
                row.createCell(4).setCellValue(stat.getPostsViewed() != null ? stat.getPostsViewed() : 0L);
                row.createCell(5).setCellValue(stat.getLikesReceived() != null ? stat.getLikesReceived() : 0L);
                row.createCell(6).setCellValue(stat.getMessagesReceived() != null ? stat.getMessagesReceived() : 0L);
            }
            workbook.write(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar reporte Excel: " + e.getMessage());
        }
    }
}
