<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmCategoryDetail_2_1.aspx.vb" Inherits="ICC.TrmCategoryDetail_2_1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/TrmCategoryDetail_2_1.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="TrxID" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategory" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategoryType" runat="server" />
    <asp:HiddenField ID="Hd_CmbCategoryTopic" runat="server" />
    <asp:HiddenField ID="Hd_Status" runat="server" />
 
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Data Topic 2_1&nbsp;<i class="fa fa-plus" onclick="showAdd()" style="cursor:pointer;"></i></h4>
                    </div>
                    <div class="box-body">
                        <table id="TrmCategoryDetail" class="table mt-0 table-hover no-wrap table-borderless" style="width: 100%; overflow-x: scroll; overflow: scroll;">
                            <thead>
                                <tr>
                                   
                                    <th>ID</th>
                                    <th>Type </th>
                                    <th>Category </th>
                                    <th>Topic</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>User Create</th>
                                    <th style="width: 200px;">Date Create</th>
                                    <th style="width: 50px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /.modal -->
    <div class="modal modal-right fade" id="ModalChannel" tabindex="-1" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Form Data Topic</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Type</label>
                                <select name="select" id="cmbCategory" class="form-control" onchange="cmbCategoryChange()" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Category</label>
                                <select name="select" id="cmbCategoryType" class="form-control" onchange="getWS_cmbCategoryType(1)" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Topic</label>
                                <select name="select" id="cmbCategoryTopic" class="form-control" onchange="getWS_cmbCategoryTopic(1)" style="height: 33px;">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>New</label>
                                <input type="text" class="form-control" id="TxtCategoryTypeName" placeholder="Category Detail Name">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Status</label>
                                <select name="select" id="cmbStatus" class="form-control" onchange="getWS_Status(1)" style="height: 33px;">
                                    <option value="">Select</option>
                                    <option value="Y">Aktif</option>
                                    <option value="N">Non Aktif</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionUpdate()" id="Update">Update</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right" onclick="ActionSimpan(0)" id="Simpan">Save</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

