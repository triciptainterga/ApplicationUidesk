﻿Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Drawing
Imports System.IO
Imports System.Security.Cryptography
Imports DevExpress.XtraPrinting
Public Class ReportCSAT
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        tempTrxSLA.SelectCommand = "select a.TicketNumber,a.Channel,b.ValueDetail ,a.ResultCSAT,a.UserName,a.CreatedDatefrom Temp_TrxCSAT a  
left join Temp_TrxCSAT_Detail b
on a.UniqueID = b.UniqueID"
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        tempTrxSLA.SelectCommand = "select a.TicketNumber,a.Channel,b.ValueDetail ,a.ResultCSAT,a.UserName,a.CreatedDate from Temp_TrxCSAT a  
left join Temp_TrxCSAT_Detail b
on a.UniqueID = b.UniqueID"
    End Sub

    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        tempTrxSLA.SelectCommand = "select a.TicketNumber,a.Channel,b.ValueDetail ,a.ResultCSAT,a.UserName,a.CreatedDate from Temp_TrxCSAT a  
left join Temp_TrxCSAT_Detail b
on a.UniqueID = b.UniqueID"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                Dim options As New XlsExportOptions
                ASPxGridViewExporter1.WriteXlsxToResponse("SalesForce_2020_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("SalesForce_2020_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("SalesForce_2020_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
End Class