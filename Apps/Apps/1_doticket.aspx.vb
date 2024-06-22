Imports System
Imports System.IO
Imports System.Data
Imports System.Data.SqlClient
Imports System.Security.Cryptography
Public Class _1_doticket
    Inherits System.Web.UI.Page

    Dim strTime As String = DateTime.Now.ToString("ddhhmmssfff")
    Dim _ClassFunction As New WebServiceTransaction
    Dim _sqlconn, _sqlconnect, _sqlconnections As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim _read, _reader, _reading, _sqlreader As SqlDataReader
    Dim _sqlcomm, _sqlcommands, _sqlcommander As SqlCommand
    Dim _strsql, _strselect, _strsqlselect As String
    Dim _write As String
    Dim _ClassAux As New TrmAux
    Dim Proses As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        TrxNumberID.Value = strTime & New Random().Next(10000, 99999)
        TrxThreadID.Value = strTime & New Random().Next(100000, 999999)

        _strsqlselect = "select * from configfeatureuidesk where ConfigName='config.fitur.nota' and ConfigVal=1 and ConfigStatus='True'"


        _sqlcommander = New SqlCommand(_strsqlselect, _sqlconnections)
        _sqlconnections.Open()
        _reading = _sqlcommander.ExecuteReader()

        If _reading.HasRows Then
            _reading.Read()
            navpills6.Visible = True
            menunavpills6.Visible = True
        Else

            navpills6.Visible = False
            menunavpills6.Visible = False

            'Response.Redirect("auth_lockscreen.html")
        End If

        _reading.Close()
        _sqlconnections.Close()

    End Sub

End Class