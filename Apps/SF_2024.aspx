<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="SF_2024.aspx.vb" Inherits="ICC.SF_2024" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row" runat="server">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Report Sales Force 2024&nbsp;</h4>
                    </div>
                    <div class="box-body p-15">
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView" runat="server" Width="100%"
                            DataSourceID="tempTrxSLA" Styles-Header-Font-Bold="true" Font-Size="Small" Theme="MetropolisBlue" Styles-Cell-HorizontalAlign="Center" Styles-Header-HorizontalAlign="Center">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                            <Columns>
                                <dx:GridViewDataTextColumn Caption="AccountName" FieldName="AccountName" Width="250px" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="CaseOwner" FieldName="CaseOwner" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="ContactName" FieldName="ContactName" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Mobile" FieldName="Mobile" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Kota" FieldName="Kota" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Karyawan" FieldName="Karyawan" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Subject" FieldName="Subject" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Status" FieldName="Status" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="CaseNumber" FieldName="CaseNumber" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="SubType1" FieldName="SubType1" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="SubType2" FieldName="SubType2" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="SubType3" FieldName="SubType3" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="SubType4" FieldName="SubType4" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="CaseOrigin" FieldName="CaseOrigin" Width="250px"></dx:GridViewDataTextColumn>
                            </Columns>
                        </dx:ASPxGridView>
                        <hr />
                        <div class="row">
                            <div class="col-sm-2">
                                <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                                    <asp:ListItem Value="xlsx" Text="Excel" />
                                    <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                    <asp:ListItem Value="csv" Text="CSV" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-sm-2">
                                <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis"
                                    HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                </dx:ASPxButton>
                            </div>
                        </div>
                    </div>
                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                    <div class="box-footer with-border">
                    </div>
                </div>
            </div>
        </div>
        <asp:SqlDataSource ID="tempTrxSLA" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
    </section>
</asp:Content>
