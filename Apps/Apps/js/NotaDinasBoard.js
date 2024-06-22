$(document).ready(function () {
    //alert("test")
    $("#LoaderPageCounting").hide();
    getWS_2_taskboard();
    getWS_DataTableTaskboard();
    req_AllowAdminDatakelola();
    if (getParameterByName("api") == "1") {
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK124'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                if (json.length == 0) {
                    console.log("ChannelWhatsApp_NotFound_1")
                } else {
                    console.log("ChannelupdateAuxDatakelola_2")
                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "ready", $("#SM_CompanyToken").val());
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
            data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK124'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var json = JSON.parse(data.d);
                var i, x, result = "";
                if (json.length == 0) {
                    updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(xmlHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }
});
//REQ ALLOW PAGE ADMIN 06 02 2024
function req_AllowAdminDatakelola() {
    var settings = {
        "url": "https://multichat-2.uidesk.id/sso/admin?token=01HGSBPPM4Z0PTPQGY1BE37DGD",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getWS_2_taskboard() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = $("#TrxLoginTypeAngka").val();
    var ValSpv = $("#TrxLayerUser").val();
    var result = "";
    var messageDiv = $('#2_TampungKotakAtas');
    $.ajax({
        type: "POST",
        url: "asmx/WebServiceNota.asmx/ws_2_taskboard_nota",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {
                //alert(json[i].JumlahData);
                console.log(json);
                result = '<div class="col-lg-3 col-6"> ' +
                    '<a class="box box-link-shadow text-center" href="NotaDinasBoard.aspx?status=' + json[i].StatusData + '&mid=' + getParameterByName("mid") + '&smid=' + getParameterByName("smid") + '"> ' +
                    '<div class="box-body"> ' +
                    '<div class="font-size-24">' + json[i].JumlahData + '</div> ' +
                    '<span>' + json[i].StatusData + '</span> ' +
                    '</div> ' +
                    '<div class="box-body ' + json[i].statusColor + '"> ' +
                    '<center> ' +
                    '<span class="mdi ' + json[i].statusIcon + ' font-size-30"></span> ' +
                    '</center> ' +
                    '</div> ' +
                    '</a> ' +
                    '</div>';

                messageDiv.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_DataTableTaskboard() {
    $("#LoaderPageCounting").show();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLoginTypeAngka = $("#TrxLoginTypeAngka").val();
    var TrxDivisi = $("#TrxDivisi").val();
    var TrxStatus = getParameterByName("status");
    var result = "";
    var myTaskboardTicket = $('#TaskboardTicket').DataTable(
        //{
        //    "order": [[1, "asc"]]
        //},
        {
            "processing": true,
            "language": {
                processing: '<i class="spinner-border text-warning"></i><span>Loading...</span> '
            },
            //"serverSide": true,
        });
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/WebServiceNota.asmx/DataTableTaskboardNew_nota",
        data: "{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: '" + TrxDivisi + "',TrxStatus: '" + TrxStatus + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            //messageDiv.empty();
            myTaskboardTicket.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {
                    console.log(json);
                    var urlAction = "<div class='dropdown'>" +
                        "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                        "<div class='dropdown-menu dropdown-menu-right'>" +
                        //"<a class='dropdown-item' href='#' onclick=showInternalNote('" + json[i].TicketNumber + "')><i class='fa fa-plus'></i> Internal Note</a>" +
                        //"<div class='dropdown-divider'></div>" +
                        "<a class='dropdown-item' href='1_journey_new.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=" + json[i].Status + "'><i class='si-arrow-right-circle si'></i> Follow up</a>" +
                        "</div>" +
                        "</div>"
                    //alert(json[i].TrxID);

                    //if (json[i].datecreate == "null") {
                    //var ConverTanggal = "-";
                    //} else {
                    var d = new Date(json[i].datecreate);
                    var milisegundos = parseInt(json[i].datecreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime
                    //}
                    //var urlAction = "<a href='1_journey.aspx?ticketid=" + json[i].TicketNumber + "'><i class='si-arrow-right-circle si'></i></a>"
                    if (json[i].Status == "Open") {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "In progress") {
                        var TrxParam = "<span class='badge badge-pill badge-warning' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Solved") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Closed") {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 70px;'>" + json[i].Status + "</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-primary' style='width: 120px;'>" + json[i].Status + "</span>"
                    }
                    if (json[i].TicketPosition == "1") {
                        var TrxPosition = "Layer 1"
                    } else if (json[i].TicketPosition == "2") {
                        var TrxPosition = "Layer 2"
                    } else if (json[i].TicketPosition == "3") {
                        var TrxPosition = "Layer 3"
                    } else if (json[i].TicketPosition == "4") {
                        var TrxPosition = "Eksternal/Vendor"
                    }
                    var DaySLA = json[i].UsedDaySLAOK
                    var OverDaySLA = DaySLA.replace("Over", "");
                    var HoursDaySLA = OverDaySLA.replace("Hours", "");
                    var LaterDaySLA = HoursDaySLA.replace("Later", "");

                    //alert(json[i].SLA)
                    //alert(HoursDaySLA)
                    //var HoursDaySLA = 3
                    //if (Number(LaterDaySLA) < json[i].SLA) {
                    //    var Indikator = "<span class='badge badge-dot badge-lg mr-1' style='background-color: #3e8ef7'></span>";
                    //} else if (Number(LaterDaySLA) == json[i].SLA) {
                    //    var Indikator = "<span class='badge badge-dot badge-lg mr-1' style='background-color: #faa700'></span>";
                    //} else if (Number(LaterDaySLA) > json[i].SLA) {
                    //    var Indikator = "<span class='badge badge-dot badge-lg mr-1' style='background-color: #ff4c52'></span>";
                    //}

                    if (Number(json[i].UsedDaySLAAngka) < json[i].SLA) {
                        //biru
                        var Indikator = "<span class='badge badge-dot badge-lg mr-1' style='background-color: #3e8ef7'></span>";
                    } else if (Number(json[i].UsedDaySLAAngka) == json[i].SLA) {
                        //orange
                        var Indikator = "<span class='badge badge-dot badge-lg mr-1' style='background-color: #faa700'></span>";
                    } else if (Number(json[i].UsedDaySLAAngka) > json[i].SLA) {
                        //red
                        var Indikator = "<span class='badge badge-dot badge-lg mr-1' style='background-color: #ff4c52'></span>";
                    }
                    //var Indikator = "<span class='badge badge-ring badge-danger mr-1'></span>"
                    myTaskboardTicket.row.add([Indikator, json[i].TicketNumber, json[i].NamePIC, json[i].CategoryName, json[i].SLA, json[i].UsedDaySLAOK, TrxPosition, TrxParam, ConverTanggal, urlAction]).draw(false);

                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {
            $("#LoaderPageCounting").hide();
        }
    })
}
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function showInternalNote(id) {
    $("#InternalNote").val("");
    $("#ContentPlaceHolder1_TrxTicketID").val(id);
    $("#modal-center").modal('show');
    console.log("session : " + $("#hd_sessionLogin").val());
    console.log("TrxTicketNumber : " + id);
}
function ActionInternalNote() {
    var TrxInternalNote = CKEDITOR.instances.InternalNote.getData();
    if (TrxInternalNote == "") {
        $.toast({
            heading: 'Hi ' + $("#hd_sessionLogin").val() + '',
            text: 'Please fill in completely, and check again ya...',
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
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

                var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxTicketNumber: $("#ContentPlaceHolder1_TrxTicketID").val(), TrxInternalNote: encodeData(TrxInternalNote) });
                console.log("form_data : " + form_data);
                $.ajax({
                    url: "asmx/ServiceTaskboard.asmx/InsertNoteInternal",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: "{ TrxUsername: '" + TrxUsername + "', TrxCustomerID: '" + TrxCustomerID + "',TxtThreadID: '" + TxtThreadID + "',TxtAccount: '" + TxtAccount + "',TrxPelapor: '" + TrxPelapor + "',TrxPelaporEmail: '" + TrxPelaporEmail + "',TrxPelaporPhone: '" + TrxPelaporPhone + "',TrxPelaporAddress: '" + encodeData(TrxPelaporAddress) + "',TrxKejadian: '" + TrxKejadian + "',TrxPenyebab: '" + TrxPenyebab + "',TrxPenerimaPengaduan: '" + TrxPenerimaPengaduan + "',TrxStatusPelapor: '" + TrxStatusPelapor + "',TrxSkalaPrioritas: '" + TrxSkalaPrioritas + "',TrxJenisNasabah: '" + TrxJenisNasabah + "',TrxNomorRekening: '" + TrxNomorRekening + "',TrxSumberInformasi: '" + TrxSumberInformasi + "',TrxCategory: '" + TrxCategory + "',TrxLevel1: '" + TrxLevel1 + "',TrxLevel2: '" + TrxLevel2 + "',TrxLevel3: '" + TrxLevel3 + "',TrxComplaint: '" + encodeData(TrxComplaint) + "',TrxResponse: '" + encodeData(TrxResponse) + "',TrxChannel: '" + TrxChannel + "',TrxStatus: '" + TrxStatus + "',TrxEskalasi: '" + TrxEskalasi + "',TrxSLA: '" + TrxSLA + "',TrxExtendCategory: '" + TrxExtendCategory + "',TrxLayer: '" + TrxLayer + "',TrxThreadID:'" + TxtThreadID + "', TrxGenesysID:'" + TrxGenesysID + "', TxtContactID:'" + TxtContactID + "'}",
                    data: form_data,
                    success: function () {
                        console.log("Function ActionInternalNote : " + form_data)
                        var TrxMessage = 'Your data <b>internal note</b> has been save'
                        AutoValidasiSuccess($("#hd_sessionLogin").val(), TrxMessage);
                        $("#modal-center").modal('hide');
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        console.log(xmlHttpRequest.responseText);
                        console.log(textStatus);
                        console.log(errorThrown);
                    },
                    complete: function () {

                    }
                });

                swal("save data has been success", {
                    icon: "success",
                });

            } else {
                //swal("Your imaginary file is safe!");
                $("#modal-center").modal('hide');
            }
        });
}
function AutoValidasiWarning(TrxCreatedby, Message) {
    $.toast({
        heading: '<b>Hi agent ' + TrxCreatedby + '</b>',
        text: '' + Message + '',
        position: 'top-left',
        loaderBg: '#ff6849',
        icon: 'warning',
        hideAfter: 3500,
        stack: 6
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
}
async function updateAuxDatakelola(token_agent, value, token_company) {
    await fetch("https://datakelola.com/api/agent/aux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token_agent: token_agent,
            aux: value,
            token: token_company,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //alert("updateAuxDatakelola says: " + data.message);
        });
}