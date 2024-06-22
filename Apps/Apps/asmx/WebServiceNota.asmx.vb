Imports System.ComponentModel
Imports System.Web
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Services.Protocols
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.Data.SqlClient
Imports System.Net
Imports System.IO
Imports System.Xml
Imports System.Data.OleDb
Imports System.Data.Common

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class WebServiceNota
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hello World"
    End Function

    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
    Public Class dataHeaderTimeline
        Public Property Tanggal As String
        Public Property StatusNya As String
        Public Property LevelUser As String

    End Class
    Public Class dataDetailTimeline
        Public Property Tanggal As String
        Public Property StatusNya As String
        Public Property LevelUser As String
        Public Property Perihal As String
        Public Property IsiNota As String
        Public Property Attachment As String
    End Class

    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ws_dataDisposisiNota(ByVal NotaID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec Feature_SP_NOTADISPOSISI"
        Dim sql As String = "" & NameSP & " '" & NotaID & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("Feature_SP_NOTADISPOSISI", conn)
                sqlComm.Parameters.AddWithValue("@NotaID", NotaID)

                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ws_2_taskboard_nota(ByVal UserID As String, ByVal LayerID As String, ByVal Spv As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Try
        '    Using conn As SqlConnection = New SqlConnection(connstring)
        '        conn.Open()
        '        sql = "exec SP_TempKotakTodolist '" & UserID & "','" & LayerID & "','" & Spv & "'"
        '        Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '        Dim ds As DataSet = New DataSet()
        '        ad.Fill(ds)
        '        dt = ds.Tables(0)
        '        conn.Close()
        '    End Using
        'Catch ex As Exception
        '    LogError(HttpContext.Current.Session("UserName"), ex, sql)
        'Finally
        '    LogSuccess(HttpContext.Current.Session("UserName"), sql)
        'End Try
        Dim NameSP As String = "Exec SP_TempKotakNota"
        Dim sql As String = "" & NameSP & " '" & UserID & "', '" & LayerID & "', '" & Spv & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("SP_TempKotakNota", conn)
                sqlComm.Parameters.AddWithValue("@UserID", UserID)
                sqlComm.Parameters.AddWithValue("@LayerID", LayerID)
                sqlComm.Parameters.AddWithValue("@Spv", Spv)
                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataTableTaskboardNew_nota(ByVal TrxUserName As String, ByVal TrxStatus As String, ByVal TrxLoginTypeAngka As String, ByVal TrxDivisi As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        ''exec NEW_Sp_Open 'Agent1','','1','1'
        'Try
        '    Using conn As SqlConnection = New SqlConnection(connstring)
        '        conn.Open()

        '        sql = "exec NEW_Sp_Open '" & TrxUserName & "','" & TrxStatus & "','" & TrxLoginTypeAngka & "','" & TrxDivisi & "'"

        '        Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '        Dim ds As DataSet = New DataSet()
        '        ad.Fill(ds)
        '        dt = ds.Tables(0)
        '        conn.Close()
        '    End Using
        'Catch ex As Exception
        '    LogError(HttpContext.Current.Session("UserName"), ex, sql)
        'Finally
        '    LogSuccess(HttpContext.Current.Session("UserName"), sql)
        'End Try
        'Dim tableJson As String = BigConvertDataTabletoString(dt)
        'Return tableJson

        Dim NameSP As String = "Exec DataTableTaskboardNew_nota"
        Dim sql As String = "" & NameSP & " '" & TrxUserName & "', '" & TrxStatus & "', '" & TrxLoginTypeAngka & "','" & TrxDivisi & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("DataTableTaskboardNew_nota", conn)
                sqlComm.Parameters.AddWithValue("@username", TrxUserName)
                sqlComm.Parameters.AddWithValue("@statusData", TrxStatus)
                sqlComm.Parameters.AddWithValue("@ticketPosition", TrxLoginTypeAngka)
                sqlComm.Parameters.AddWithValue("@userDivisi", TrxDivisi)
                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ws_dataContentNota(ByVal NotaID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec Feature_SP_CONTENTNOTA"
        Dim sql As String = "" & NameSP & " '" & NotaID & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("Feature_SP_CONTENTNOTA", conn)
                sqlComm.Parameters.AddWithValue("@NotaID", NotaID)

                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ws_dataHeaderTimeline(ByVal NotaID As String, ByVal Username As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec Feature_SP_HEADERNOTA"
        Dim sql As String = "" & NameSP & " '" & NotaID & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("Feature_SP_HEADERNOTA", conn)
                sqlComm.Parameters.AddWithValue("@NotaID", NotaID)

                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, Sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ws_dataDetailTimeline(ByVal NotaID As String, ByVal Username As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim NameSP As String = "Exec Feature_SP_DETAILNOTA"
        Dim sql As String = "" & NameSP & " '" & NotaID & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("Feature_SP_DETAILNOTA", conn)
                sqlComm.Parameters.AddWithValue("@NotaID", NotaID)

                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionNota(ByVal Username As String, ByVal TicketNumber As String, ByVal NomorNota As String, ByVal TanggalNota As String, ByVal JudulNota As String, ByVal TujuanNota As String, ByVal PerihalNota As String, ByVal DistribusiNota As String, ByVal PesanNota As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Feature_UIDESK_Temp_NotaInsert"
                sqlComm.CommandType = CommandType.StoredProcedure

                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TicketNumber)
                sqlComm.Parameters.AddWithValue("TrxNomorNota", NomorNota)
                sqlComm.Parameters.AddWithValue("TrxTanggalNota", TanggalNota)
                sqlComm.Parameters.AddWithValue("TrxJudulNota", JudulNota)
                sqlComm.Parameters.AddWithValue("TrxTujuanNota", TujuanNota)
                sqlComm.Parameters.AddWithValue("TrxPerihalNota", PerihalNota)
                sqlComm.Parameters.AddWithValue("TrxDistribusiNota", DistribusiNota)
                sqlComm.Parameters.AddWithValue("TrxPesanNota", HttpUtility.UrlDecode(PesanNota))
                sqlComm.Parameters.AddWithValue("TrxUserCreate", Username)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Feature_UIDESK_Temp_NotaInsert " & "'" & TicketNumber & "'," & "'" & NomorNota & "'," & "'" & HttpUtility.UrlDecode(PesanNota) & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Note Internal Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec Feature_UIDESK_Temp_NotaInsert " & "'" & TicketNumber & "'," & "'" & NomorNota & "'," & "'" & HttpUtility.UrlDecode(PesanNota) & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionDetailNota(ByVal Username As String, ByVal NomorNota As String, ByVal PesanNota As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Feature_UIDESK_Temp_NotaInsertInteraction"
                sqlComm.CommandType = CommandType.StoredProcedure


                sqlComm.Parameters.AddWithValue("TrxNomorNota", NomorNota)
                sqlComm.Parameters.AddWithValue("TrxPesanNota", HttpUtility.UrlDecode(PesanNota))
                sqlComm.Parameters.AddWithValue("TrxUserCreate", Username)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Feature_UIDESK_Temp_NotaInsertInteraction " & "'" & Username & "'," & "'" & NomorNota & "'," & "'" & HttpUtility.UrlDecode(PesanNota) & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Feature_UIDESK_Temp_NotaInsertInteraction Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec Feature_UIDESK_Temp_NotaInsertInteraction " & "'" & Username & "'," & "'" & NomorNota & "'," & "'" & HttpUtility.UrlDecode(PesanNota) & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Public Function BigConvertDataTabletoString(ByVal dt As DataTable) As String
        Dim serializer As System.Web.Script.Serialization.JavaScriptSerializer = New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rows As List(Of Dictionary(Of String, Object)) = New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object)

        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()

            For Each col As DataColumn In dt.Columns
                row.Add(col.ColumnName, dr(col))
            Next

            rows.Add(row)
        Next

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        js.MaxJsonLength = Int32.MaxValue
        Return js.Serialize(rows)
    End Function
    Public Sub LogError(ByVal agentName As String, ex As Exception, strUser As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strUser)
        message += Environment.NewLine
        message += String.Format("Message: {0}", ex.Message)
        message += Environment.NewLine
        message += String.Format("StackTrace: {0}", ex.StackTrace)
        message += Environment.NewLine
        message += String.Format("Source: {0}", ex.Source)
        message += Environment.NewLine
        message += String.Format("TargetSite: {0}", ex.TargetSite.ToString())
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed-----------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", strUser)
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    Public Function ConvertDataTabletoString(ByVal dt As DataTable) As String
        Dim serializer As System.Web.Script.Serialization.JavaScriptSerializer = New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rows As List(Of Dictionary(Of String, Object)) = New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object)

        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()

            For Each col As DataColumn In dt.Columns
                row.Add(col.ColumnName, dr(col))
            Next

            rows.Add(row)
        Next

        Return serializer.Serialize(rows)
    End Function
    Public Sub LogSuccess(ByVal agentName As String, strValue As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strValue)
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
End Class