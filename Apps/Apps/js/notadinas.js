$(document).ready(function () {
    var nomorNotaGenerate = 'N-' + $("#hd_TicketNumber").val();
    $("#NomorNota").val(nomorNotaGenerate);
    Get_HeaderTimeline(nomorNotaGenerate);
    Get_ContentNota($("#hd_TicketNumber").val());
    logicNotaDisposisi($("#hd_TicketNumber").val());
}
);
function logicNotaDisposisi(NotaID) {
    console.log("hehe Get Disposisi Nota");
    if ($("#TrxLoginTypeAngka").val() == "3") {
        $("#escalationto").css("display", "none");
        $("#P_Escalation").append("Re Assign");
        $("#CreateNotaDinas").css("display", "none");
        $("#buttonManagerAccess").css("display", "none");
    } else {
        $("#P_Escalation").append("Escalation");
    }

    if ($("#TrxLoginTypeAngka").val() != "3") {
        $("#newNotaDinas").css("display", "none");

    }
    if ($("#TrxLoginTypeAngka").val() == "7") {
        $("#newNotaDinas").css("display", "inline");
        showNota();
        $("#formShowNota").css("display", "block");
        $("#formInputNota").css("display", "none");
        $("#buttonManagerAccess").css("display", "inline");
    }
    if ($("#TrxLoginTypeAngka").val() == "5") {
        $("#newNotaDinas").css("display", "inline");
        showNota();
        $("#formShowNota").css("display", "inline");
        $("#formInputNota").css("display", "inline");
        //$("#buttonManagerAccess").css("display", "inline");
    }
    var form_data = JSON.stringify({ NotaID: NotaID });
    $.ajax({
        type: "POST",
        url: "asmx/WebServiceNota.asmx/ws_dataDisposisiNota",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(json);

            for (i = 0; i < json.length; i++) {

                if (json[i].StatusDisposition == "Y") {
                    $("#formInputNota").css("display", "none");
                }
                //console.log(json[i].TanggalHeader);
                //Lampiran belum
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    
}
function showNota() {
    $("#ContentTicket").css('display', 'none');
    $("#FooterTicket").css('display', 'none');
    $("#ContentNota").css('display', 'block');
}
function showCRM() {
    $("#ContentNota").css('display', 'none');
    $("#ContentTicket").css('display', 'block');
    $("#FooterTicket").css('display', 'block');
}



function Get_ContentNota(NotaID) {
    console.log("hehe Get Content Nota");
    var form_data = JSON.stringify({ NotaID: NotaID});
    $.ajax({
        type: "POST",
        url: "asmx/WebServiceNota.asmx/ws_dataContentNota",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(json);
            
            for (i = 0; i < json.length; i++) {
                $("#NomorNota").val(json[i].NomorNota);
                $("#val_NomorNota").html(json[i].NomorNota);
                $("#val_TanggalNota").html(json[i].TanggalHeader);
                $("#val_JudulNota").html(json[i].JudulNota);
                $("#val_TujuanNota").html(json[i].PenerimaNota);
                $("#val_PerihalNota").html(json[i].PerihalNota);
                $("#val_DistribusiNota").html(json[i].SalinanDistribusi);
                $("#val_IsiPesanNota").html(json[i].IsiPesan);
                //console.log(json[i].TanggalHeader);
                //Lampiran belum
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function Get_HeaderTimeline(NotaID) {
    console.log("hehe");
    var form_data = JSON.stringify({ NotaID: NotaID, Username: 'Admin'});
    $.ajax({
        type: "POST",
        url: "asmx/WebServiceNota.asmx/ws_dataHeaderTimeline",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(json);
            //$("ol").append("<li><a href='#0' data-date='28/02/2018' class='selected'>28 Feb</a></li>");
            for (i = 0; i < json.length; i++) {

                $("#dataHeaderTimelineDiv").append('<span class="timeline-label">' +
                    '<span class="badge badge-pill badge-primary badge-lg">' + json[i].StatusNota +'-' + json[i].TanggalHeader +'</span>' +
                                            '</span>' +
                                            '<div class="timeline-item">' +
                                            '<div class="timeline-point timeline-point-success">' +
                                            '<i class="fa fa-book"></i>' +
                                            '</div>' +
                                            '<div class="timeline-event">' +
                                            '<div class="timeline-heading">' +
                                            '<h4 class="timeline-title">' + json[i].Username +'</h4>' +
                                            '</div>' +
                                            '<div class="timeline-body">' +
                                            '' + json[i].Keterangan +'' +
                                            '</div>' +
                                            '<div class="timeline-footer">' +
                                            '<p class="text-right">' + json[i].TanggalLengkap +'</p>' +
                                            '</div>' +
                                            '</div>' +
                                            '</div>');
                console.log(json[i].TanggalHeader);
               
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}



function submitNotaJourney() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxTicketNumber = $("#hd_TicketNumber").val();
    var TrxNomorNota = $("#NomorNota").val();
    var TrxTanggalNota = $("#TanggalNota").val();
    var TrxJudulNota = $("#JudulNota").val();
    var TrxTujuanNota = $("#TujuanNota").val();
    var TrxPerihalNota = $("#PerihalNota").val();
    var TrxDistribusiNota = $("#DistribusiNota").val();
    var TrxPesanNota = $("#IsiPesanNota").val();
    //getWS_MasterCustomerSelected(cusTomerid)
    var form_data = JSON.stringify({ Username: TrxUsername, TicketNumber: TrxTicketNumber, NomorNota: TrxNomorNota, TanggalNota: TrxTanggalNota, JudulNota: TrxJudulNota, TujuanNota: TrxTujuanNota, PerihalNota: TrxPerihalNota, DistribusiNota: TrxDistribusiNota, PesanNota: TrxPesanNota });
    $.ajax({
        url: "asmx/WebServiceNota.asmx/InsertTransactionNota",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function () {
            console.log("Exec InsertTransactionNota : " + form_data)
            $.toast({
                heading: '<b>Hi agent ' + $("#hd_sessionLogin").val() + '</b>',
                text: 'Nota dinas berhasil di buat',
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
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

function SubmitNotaSesuai() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxNomorNota = $("#NomorNota").val();
    var TrxPesanNota = $("#IsiPesanNotaManager").val();
    //getWS_MasterCustomerSelected(cusTomerid)
    var form_data = JSON.stringify({ Username: TrxUsername, NomorNota: TrxNomorNota, PesanNota: TrxPesanNota });
    $.ajax({
        url: "asmx/WebServiceNota.asmx/InsertTransactionDetailNota",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function () {
            console.log("Exec InsertTransactionDetailNota : " + form_data)
            $.toast({
                heading: '<b>Hi user ' + $("#hd_sessionLogin").val() + '</b>',
                text: 'Data Nota berhasil di lanjutkan',
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
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