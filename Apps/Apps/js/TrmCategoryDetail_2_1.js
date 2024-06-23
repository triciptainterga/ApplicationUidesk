$(document).ready(function () {
    cmbCategory();
    TrmCategoryDetail();
});
function TrmCategoryDetail() {
    var myTable = $('#TrmCategoryDetail').DataTable();
    $.ajax({
        type: "POST",
        //url: "WebServiceGetDataMaster.asmx/TableTransactionTrmCategoryDetail_2_1",
        //data: "{TrxID:'-', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK310_2_1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].DateCreate);
                var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "<a class='dropdown-item' href='#' onclick=showUpdate('" + json[i].Id + "','" + json[i].CategoryID + "','" + json[i].SubCategory1ID + "','" + json[i].SubCategory2ID + "','" + json[i].name + "','" + json[i].Status + "')><i class='fa fa-pencil'></i> Edit</a>" +
                    "</div>" +
                    "</div>"
                if (json[i].Status == "Y") {
                    var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Aktif</span>"
                } else {
                    var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>Non Aktif</span>"
                }
                //var IdData = "<label style='display:none'>'" +json[i].Id +"'</span>"
                myTable.row.add([json[i].Id, json[i].category, json[i].SubName, json[i].Topik, json[i].name, TrxParam, json[i].UserCreate, newDate + ' ' + newTime, urlClick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSelectCategoryDetail(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/SelectedTransactionTrmCategoryDetail",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '-', TrxStatus: '-'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            for (i = 0; i < json.length; i++) {

                $('#cmbCategory option:selected').text(json[i].CategoryName);
                $("#cmbCategoryType option:selected").text(json[i].CategoryType);
                $('#TxtCategoryTypeName').val(json[i].SubName);
                $("#cmbStatus option:selected").text(json[i].Status);

                $("#ContentPlaceHolder1_Hd_CmbCategory").val(json[i].CategoryID);
                $("#ContentPlaceHolder1_Hd_CmbCategoryType").val(json[i].SubCategory1ID);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    
}
function cmbCategory() {
    var cmbCategorySource = $('#cmbCategory');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmDropdown",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            cmbCategorySource.empty();
            cmbCategorySource.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                resultCategory = '<option value="' + json[i].CategoryID + '">' + json[i].Name + '</option>';
                cmbCategorySource.append(resultCategory);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


async function cmbCategoryChangebyId(Id,subId) {


    var JenisKondisi = "AllWhereData";
    var cmbCategoryType = $('#cmbCategoryType');
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryType.empty();
            cmbCategoryType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                if (json[i].SubCategory1ID == Id)
                    resultCategoryType = '<option selected value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                else
                    resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryType.append(resultCategoryType);
            }

            getWS_cmbCategoryTypeById(subId);
            
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbCategoryChange() {


    var JenisKondisi = "AllWhereData";
    var cmbCategoryType = $('#cmbCategoryType');
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryType.empty();
            cmbCategoryType.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryType.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function cmbTypeChange() {
    var JenisKondisi = "AllWhereData";
    var cmbCategoryTopic = $('#cmbCategoryTopic');
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryTopic.empty();
            cmbCategoryTopic.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                cmbCategoryTopic.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function cmbTypeChangebyId(Id) {
    var JenisKondisi = "AllWhereData";
    var cmbCategoryTopic = $('#cmbCategoryTopic');
    var selectedText = $("#cmbCategory").find("option:selected").text();
    var selectedValue = $("#cmbCategory").val();
    $("#ContentPlaceHolder1_Hd_CmbCategory").val(selectedValue);

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/OnChangeTransactionTrmCategoryType",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryTopic.empty();
            cmbCategoryTopic.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                if (json[i].SubCategory1ID == Id)
                    resultCategoryType = '<option selected value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';
                else
                    resultCategoryType = '<option value="' + json[i].SubCategory1ID + '">' + json[i].SubName + '</option>';

                cmbCategoryTopic.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_cmbCategoryType(value) {
    var selectedText = $("#cmbCategoryType").find("option:selected").text();
    var selectedValue = $("#cmbCategoryType").val();
    
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);

    var cmbCategoryTopic = $('#cmbCategoryTopic');
   

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK309'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryTopic.empty();
            cmbCategoryTopic.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {
                resultCategoryType = '<option value="' + json[i].SubCategory2ID + '">' + json[i].SubName + '</option>';
                cmbCategoryTopic.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}

async function getWS_cmbCategoryTypeById(value) {
    var selectedText = $("#cmbCategoryType").find("option:selected").text();
    var selectedValue = $("#cmbCategoryType").val();

    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);

    var cmbCategoryTopic = $('#cmbCategoryTopic');


    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrxTransactionTicket",
        data: "{TrxID:'" + selectedValue + "', TrxSearching:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK309'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, resultCategoryType = "";

            cmbCategoryTopic.empty();
            cmbCategoryTopic.append('<option value="">Select</option>');
            for (i = 0; i < json.length; i++) {

                if (value == json[i].SubCategory2ID)
                    resultCategoryType = '<option selected value="' + json[i].SubCategory2ID + '">' + json[i].SubName + '</option>';
                else
                    resultCategoryType = '<option value="' + json[i].SubCategory2ID + '">' + json[i].SubName + '</option>';
                cmbCategoryTopic.append(resultCategoryType);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_cmbCategoryTopic(value) {
    var selectedText = $("#cmbCategoryTopic").find("option:selected").text();
    var selectedValue = $("#cmbCategoryTopic").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_CmbCategoryTopic").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
    //alert(selectedValue)
    //alert($("#ContentPlaceHolder1_Hd_CmbCategoryDetail").val())
}
function showAdd() {
    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "block");
    $("#Update").css("display", "none");
    $("#TxtCategoryTypeName").val("");
    $("#cmbCategory").val("")
    $("#cmbCategoryType").val("");
    $("#cmbStatus").val("");
}
 function showUpdate(TrxID,CategoryID,SubCategory1ID,SubCategory2ID,Name,Status) {

    $("#ModalChannel").modal('show');
    $("#Simpan").css("display", "none");
    $("#Update").css("display", "block");
    $("#ContentPlaceHolder1_TrxID").val(TrxID);



   

    //$('#cmbCategory').selectedValue();
    $('#cmbCategory').val(CategoryID);

   
     cmbCategoryChangebyId(SubCategory1ID, SubCategory2ID)

     // getWS_cmbCategoryTypeById(SubCategory2ID)
    //$("#cmbCategoryType").val(SubCategory1ID);
   // $("#cmbCategoryTopic").val(SubCategory2ID);
    $('#TxtCategoryTypeName').val(Name);
    $("#cmbStatus").val(Status);
        
      


   //TrmSelectCategoryDetail($("#ContentPlaceHolder1_TrxID").val())
}
function ActionSimpan(Id) {
    var ID = Id;
    var TrxName = $('#TxtCategoryTypeName').val();
    var TrxCmbCategory = $("#cmbCategory").val();
    var TrxCmbCategoryType = $("#cmbCategoryType").val();
    var TrxCmbCategoryTopic = $("#cmbCategoryTopic").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();

    if (TrxCmbCategory == '') {
        swal("Type is empty")
        return false;
    }
    if (TrxCmbCategoryType == '') {
        swal("Category is empty")
        return false;
    }
    if (TrxCmbCategoryTopic == '') {
        swal("Category is empty")
        return false;
    }
   
    if (TrxName == '') {
        swal("Topic is empty")
        return false;
    }
    
    if (TrxCmbStatus == '') {
        swal("Status is empty")
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ ID:ID, TrxCategoryID: TrxCmbCategory, TrxSubCategory1ID: TrxCmbCategoryType, TrxSubCategory2ID: TrxCmbCategoryTopic, TrxName: TrxName, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategoryDetail_2_1",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        $("#ModalChannel").modal('hide');
                        window.location.href = "TrmCategoryDetail_2_1.aspx";
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function ActionUpdate() {
    var ID = $('#TxtCategoryTypeName').val() ;
    var TrxName = $('#TxtCategoryTypeName').val();
    var TrxCmbCategory = $("#cmbCategory").val();
    var TrxCmbCategoryType = $("#cmbCategoryType").val();
    var TrxCmbCategoryTopic = $("#cmbCategoryTopic").val();
    var TrxCmbStatus = $("#ContentPlaceHolder1_Hd_Status").val();

    if (TrxCmbCategory == '') {
        swal("Type is empty")
        return false;
    }
    if (TrxCmbCategoryType == '') {
        swal("Category is empty")
        return false;
    }
    if (TrxCmbCategoryTopic == '') {
        swal("Category is empty")
        return false;
    }

    if (TrxName == '') {
        swal("Topic is empty")
        return false;
    }

    if (TrxCmbStatus == '') {
        swal("Status is empty")
        return false;
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ ID: $("#ContentPlaceHolder1_TrxID").val(), TrxCategoryID: TrxCmbCategory, TrxSubCategory1ID: TrxCmbCategoryType, TrxSubCategory2ID: TrxCmbCategoryTopic, TrxName: TrxName, TrxStatus: TrxCmbStatus, TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmCategoryDetail_2_1",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log(form_data)
                        $("#ModalChannel").modal('hide');
                        window.location.href = "TrmCategoryDetail_2_1.aspx";
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

            }
        });
}
function AutoValidasiSuccess(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
    //return false
}// JavaScript source code
