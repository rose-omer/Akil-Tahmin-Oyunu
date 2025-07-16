// app/data/questionTree.ts

export interface QuestionNode {
  id: string;
  question: string;
  answers: {
    evet: QuestionNode | null;
    hayır: QuestionNode | null;
  };
}

// --- Canlı Varlıklar Dalları ---
const tahmin_aslan: QuestionNode = {
  id: "tahmin_aslan",
  question: "Tahminim: Aslan. Doğru mu?",
  answers: {
    evet: null,
    hayır: null,
  },
};
const tahmin_kurt: QuestionNode = {
  id: "tahmin_kurt",
  question: "Tahminim: Kurt doğru mu  ?",
  answers: {
    evet: null,
    hayır: null,
  },
};
const kurt_mu: QuestionNode = {
  id: "kurt_mu",
  question: "Aklınızdaki hayvan, Türk kültüründe sıkça anılan ve 'auww' sesi çıkaran bir hayvan mıdır?",
  answers: {
    evet: tahmin_kurt,
    hayır: null,
  },
};

// Hayvanlar Dalları
const aslan_mı: QuestionNode = {
  id: "aslan_mı",
  question: "Lakabı 'Ormanın Kralı' mıdır?",
  answers: {
    evet: tahmin_aslan,
    hayır: kurt_mu,
  },
};
const tahmin_tilki: QuestionNode = {
  id: "tahmin_tilki",
  question: "Tahminin tilki mi ",
  answers: {
    evet: null,
    hayır: null,
  },
};
const tilki_mi: QuestionNode = {
  id: 'tilki_mi',
  question: 'Kurnazlığıyla bilinen, genellikle ormanlarda yaşayan vahşi bir hayvan mı?',
  answers: {
    evet: tahmin_tilki, // Tilki
    hayır:aslan_mı, 
  },
};

const ayi_mi: QuestionNode = {
  id: 'ayi_mi',
  question: 'Büyük, tüylü ve kış uykusuna yatan bir hayvan mı?',
  answers: {
    evet: null, // Ayı
    hayır: tilki_mi, // Ayı değilse tilki mi?
  },
};

const vahsi_dort_bacakli_mi: QuestionNode = {
  id: 'vahsi_dort_bacakli_mi',
  question: 'Vahşi bir dört bacaklı mı?',
  answers: {
    evet: ayi_mi, // Vahşiyse ayı mı, tilki mi?
    hayır: null, // Örn: Evcil ama dört bacaklı (köpek, kedi gibi)
  },
};




const kopek_mi: QuestionNode = {
  id: 'kopek_mi',
  question: "Düşündüğünüz hayvan, köpek ise 'hav' sesi çıkarır mı?",
  answers: {
    evet: null,
    hayır: null,
  },
};


const kedi_mi: QuestionNode = {
  id: 'kedi_mi',
  question: "Düşündüğünüz hayvan, kedi ise 'miyav' sesi çıkarır mı?",
  answers: {
    evet: null,
    hayır: kopek_mi,
  },
};
const inek_mi: QuestionNode = {
  id: "inek_mi",
  question: "Bu hayvan süt verir mi?",
  answers: {
    evet: {
      id: "tahmin_inek",
      question: "Tahminim: İnek. Doğru mu?",
      answers: { evet: null, hayır: null },
    },
    hayır: {
      id: "koyun_mu",
      question: "Bu hayvan yün verir mi?",
      answers: {
        evet: {
          id: "tahmin_koyun",
          question: "Tahminim: Koyun. Doğru mu?",
          answers: { evet: null, hayır: null },
        },
        hayır: {
          id: "tavuk_mu",
          question: "Bu hayvan yumurta verir mi?",
          answers: {
            evet: {
              id: "tahmin_tavuk",
              question: "Tahminim: Tavuk. Doğru mu?",
              answers: { evet: null, hayır: null },
            },
            hayır: {
              id: "domuz_mu",
              question: "Bu hayvan domuz mudur?",
              answers: {
                evet: {
                  id: "tahmin_domuz",
                  question: "Tahminim: Domuz. Doğru mu?",
                  answers: { evet: null, hayır: null },
                },
                hayır: {
                  id: "tahmin_bilinmiyor",
                  question: "Tahmin edemedim, başka bir çiftlik hayvanı olabilir mi?",
                  answers: { evet: null, hayır: null },
                },
              },
            },
          },
        },
      },
    },
  },
};

const ciftlik_hayvani_mi: QuestionNode = {
  id: 'ciftlik_hayvani_mi',
  question: 'Bir çiftlik hayvanı mı?',
  answers: {
    evet: inek_mi,
    hayır: null,
  },
};
const evde_beslenir_mi: QuestionNode = {
  id: 'evde_beslenir_mi',
  question: 'Genellikle evde mi beslenir?',
  answers: {
    evet: kedi_mi, // Örn: Köpek, kedi
    hayır: ciftlik_hayvani_mi,
  },
};
const evcil_mi: QuestionNode = {
  id: 'evcil_mi',
  question: 'Evcil bir hayvan mı?',
  answers: {
    evet: evde_beslenir_mi,
    hayır: vahsi_dort_bacakli_mi, // Vahşi tüylü dört bacaklı
  },
};

const kertenkele_mi: QuestionNode = {
  id: 'kertenkele_mi',
  question: 'Dört ayaklı ve derisi pullu bir sürüngen mi?',
  answers: {
    evet: null, // Kertenkele
    hayır: null, // Daha farklı sürüngenler
  },
};

const yilan_mi: QuestionNode = {
  id: 'yilan_mi',
  question: 'Ayakları olmayan ve sürünerek ilerleyen bir canlı mı?',
  answers: {
    evet: null, // Yılan
    hayır: kertenkele_mi, // Yılan değilse kertenkele mi?
  },
};

const pullu_mu_kabuklu_mu: QuestionNode = {
  id: 'pullu_mu_kabuklu_mu',
  question: 'Pullu veya kabuklu bir yapısı mı var?',
  answers: {
    evet: {
      id: 'balik_mi',
      question: 'Genellikle suda yaşayan, solungaçları olan bir hayvan mı?',
      answers: {
        evet: {
          id: 'kopekbaligi_mi',
          question: 'Büyük, yırtıcı ve keskin dişleri olan bir deniz canlısı mı?',
          answers: {
            evet: null, // Köpekbalığı
            hayır: null, // Sıradan balıklar
          },
        },
        hayır: yilan_mi, // Balık değilse yılan/kertenkele mi?
      },
    },
    hayır: { // Pullu veya kabuklu değilse (örn: kurbağa)
      id: 'kurbaga_mi',
      question: 'Amfibik, derisi çıplak ve nemli mi?',
      answers: {
        evet: null, // Kurbağa
        hayır: null, // Semender gibi
      },
    },
  },
};

const tuylu_mu: QuestionNode = {
  id: 'tuylu_mu',
  question: 'Tüylü mü?',
  answers: {
    evet: evcil_mi,
    hayır: pullu_mu_kabuklu_mu, // Tüylü değilse pullu/kabuklu mu?
  },
};

const guvercin_mi: QuestionNode = {
  id: 'guvercin_mi',
  question: 'Şehirlerde sık görülen, barışın sembolü olan bir kuş mu?',
  answers: {
    evet: null, // Güvercin
    hayır: null, // Diğer kuşlar
  },
};

const ordek_mi: QuestionNode = {
  id: 'ordek_mi',
  question: 'Göllerde ve su kenarlarında yaşayan, gagalı bir kuş mu?',
  answers: {
    evet: null, // Ördek
    hayır: guvercin_mi, // Ördek değilse güvercin mi?
  },
};

const ucabilir_mi: QuestionNode = {
  id: 'ucabilir_mi',
  question: 'Uçabilir mi?',
  answers: {
    evet: ordek_mi, // Uçabiliyorsa ördek mi, güvercin mi?
    hayır: null, // Penguen, devekuşu vb. (iki bacaklı ama uçamayan)
  },
};

const insan_mi: QuestionNode = {
  id: 'insan_mi',
  question: 'İnsan mı?',
  answers: {
    evet: null, // İnsan
    hayır: ucabilir_mi, // İnsan değilse uçabilir mi?
  },
};

const yunus_mi: QuestionNode = {
  id: 'yunus_mi',
  question: 'Denizde yaşayan, çok zeki olduğu bilinen bir memeli mi?',
  answers: {
    evet: null, // Yunus
    hayır: null, // Balina, fok vb.
  },
};

const surungen_mi: QuestionNode = {
  id: 'surungen_mi',
  question: 'Sürüngen mi?',
  answers: {
    evet: yilan_mi, // Sürüngen ise yılan/kertenkele mi?
    hayır: {
      id: 'deniz_memelisi_mi',
      question: 'Denizde yaşayan bir memeli mi?',
      answers: {
        evet: yunus_mi, // Deniz memelisiyse yunus mu?
        hayır: {
          id: 'bocek_mi',
          question: 'Küçük, altı veya daha fazla bacağı olan bir böcek mi?',
          answers: {
            evet: {
              id: 'karinca_mi',
              question: 'Toprakta yaşayan, koloniler halinde gezen küçük bir böcek mi?',
              answers: {
                evet: null, // Karınca
                hayır: null, // Arı, kelebek vb.
              },
            },
            hayır: null, // Diğer omurgasızlar
          },
        },
      },
    },
  },
};

const iki_bacakli_mi: QuestionNode = {
  id: 'iki_bacakli_mi',
  question: 'İki bacaklı mı?',
  answers: {
    evet: insan_mi, // İnsan mı, uçan hayvan mı?
    hayır: surungen_mi, // Dört bacaklı ve iki bacaklı değilse, sürüngen/böcek/deniz memelisi mi?
  },
};

const kac_bacakli: QuestionNode = {
  id: 'kac_bacakli',
  question: 'Dört bacaklı mı?',
  answers: {
    evet: tuylu_mu,
    hayır: iki_bacakli_mi,
  },
};

// Bitkiler ve Diğer Canlılar Dalları
const agac_mi: QuestionNode = {
  id: 'agac_mi',
  question: 'Ağaç mı?',
  answers: {
    evet: null,
    hayır: {
      id: 'kaktus_mi',
      question: 'Dikenli, kurak iklimlerde yaşayan bir bitki mi?',
      answers: {
        evet: null, // Kaktüs
        hayır: {
          id: 'bambu_mi',
          question: 'Hızlı büyüyen, uzun ve içi boş gövdeli bir bitki mi?',
          answers: {
            evet: null, // Bambu
            hayır: null, // Ot, çalı, yosun vb.
          },
        },
      },
    },
  },
};

const cicek_mi_bitki: QuestionNode = {
  id: 'cicek_mi',
  question: 'Çiçek mi?',
  answers: {
    evet: null,
    hayır: agac_mi,
  },
};

const bitki_mi: QuestionNode = {
  id: 'bitki_mi',
  question: 'Bitki mi?',
  answers: {
    evet: cicek_mi_bitki,
    hayır: { // Canlı ama hayvan veya bitki değil
      id: 'mantar_mi',
      question: 'Mantar mı?',
      answers: {
        evet: null,
        hayır: {
          id: 'mercan_mi',
          question: 'Deniz altında koloni halinde yaşayan, kayalık benzeri bir canlı mı?',
          answers: {
            evet: null, // Mercan
            hayır: null, // Bakteri, alg, mikroorganizma
          },
        },
      },
    },
  },
};

// --- Cansız Varlıklar Dalları ---

// İnsan Yapımı Cansız Dalları
const masaustu_bilgisayar_mi: QuestionNode = {
  id: 'masaustu_bilgisayar_mi',
  question: 'Masaüstü bilgisayar mı?',
  answers: {
    evet: null, // Tahmin: Masaüstü Bilgisayar
    hayır: null, // Örn: Sunucu, workstation (daha niş)
  },
};

const laptop_mu: QuestionNode = {
  id: 'laptop_mu',
  question: 'Bir laptop veya dizüstü bilgisayar mı?',
  answers: {
    evet: null, // Tahmin: Laptop
    hayır: masaustu_bilgisayar_mi, // Taşınabilir değilse masaüstü mü?
  },
};

const tasinabilir_mi_bilgisayar: QuestionNode = {
  id: 'tasinabilir_mi_bilgisayar',
  question: 'Genellikle taşınabilir bir cihaz mı?',
  answers: {
    evet: laptop_mu, // Evet ise laptop mu?
    hayır: masaustu_bilgisayar_mi, // Hayır ise masaüstü mü?
  },
};

const bilgisayar_mi: QuestionNode = {
  id: 'bilgisayar_mi',
  question: 'Bilgisayar mı?',
  answers: {
    evet: tasinabilir_mi_bilgisayar,
    hayır: null,
  },
};

const camasir_makinesi_mi: QuestionNode = {
  id: 'camasir_makinesi_mi',
  question: 'Giysileri yıkamak için kullanılan bir ev aleti mi?',
  answers: {
    evet: null, // Çamaşır Makinesi
    hayır: {
      id: 'buzdolabi_mi',
      question: 'Yiyecek ve içecekleri soğuk tutan bir ev aleti mi?',
      answers: {
        evet: null, // Buzdolabı
        hayır: null, // Diğer büyük ev aletleri (fırın, bulaşık makinesi)
      },
    },
  },
};

const buyuk_ev_aleti_mi: QuestionNode = {
  id: 'buyuk_ev_aleti_mi',
  question: 'Büyük bir ev aleti mi?',
  answers: {
    evet: camasir_makinesi_mi, // Büyükse çamaşır makinesi/buzdolabı mı?
    hayır: {
      id: 'kahve_makinesi_mi',
      question: 'Kahve yapmak için kullanılan küçük bir ev aleti mi?',
      answers: {
        evet: null, // Kahve Makinesi
        hayır: {
          id: 'televizyon_mu',
          question: 'Görüntü izlemek için kullanılan bir elektronik ev aleti mi?',
          answers: {
            evet: null, // Televizyon
            hayır: null, // Tost makinesi, mikser vb.
          },
        },
      },
    },
  },
};

const elektronik_oyuncak_mi: QuestionNode = {
  id: 'elektronik_oyuncak_mi',
  question: 'Bir oyuncağa benzer mi?',
  answers: {
    evet: null, // Kumandalı araba, video oyunu konsolu
    hayır: null, // Elektronik müzik aleti, robot
  },
};

const kitap_mi: QuestionNode = {
  id: 'kitap_mi',
  question: 'Okumak için kullanılan, sayfalardan oluşan bir nesne mi?',
  answers: {
    evet: null, // Kitap
    hayır: {
      id: 'kalem_mi',
      question: 'Yazmak veya çizmek için kullanılan ince bir araç mı?',
      answers: {
        evet: {
          id: "kalem0",
          question: "Tahminin kalem miydi?", // Yazım hatası düzeltildi: miy di -> miydi
          answers: {
            evet: null,
            hayır: null,
          },
        },
        hayır: null, // Kağıt, defter vb.
      },
    },
  },
};

const ev_aleti_mi: QuestionNode = {
  id: 'ev_aleti_mi',
  question: 'Bir ev aleti mi?',
  answers: {
    evet: buyuk_ev_aleti_mi,
    hayır: {
      id: 'mutfak_esya_mi',
      question: 'Mutfakta kullanılan bir eşya mı?',
      answers: {
        evet: null, // Çatal, kaşık, tabak
        hayır: kitap_mi, // Mutfak eşyası değilse kitap/kalem mi?
      },
    },
  },
};

const cep_telefonu_mu: QuestionNode = {
  id: 'cep_telefonu_mu',
  question: 'Cep telefonu mu?',
  answers: {
    evet: null, // Tahmin: Cep Telefonu
    hayır: {
      id: 'tablet_mi',
      question: 'Tablet mi?',
      answers: {
        evet: null, // Tahmin: Tablet
        hayır: {
          id: 'akilli_saat_mi',
          question: 'Akıllı saat veya giyilebilir teknoloji mi?',
          answers: {
            evet: null, // Tahmin: Akıllı Saat
            hayır: bilgisayar_mi, // İletişim ama bunlardan hiçbiri değilse bilgisayar mı?
          },
        },
      },
    },
  },
};

const iletisim_araci_mi: QuestionNode = {
  id: 'iletisim_araci_mi',
  question: 'İletişim kurmak için kullanılır mı?',
  answers: {
    evet: cep_telefonu_mu,
    hayır: ev_aleti_mi, // İletişim dışı teknolojikse ev aleti mi?
  },
};

const teknolojik_mi: QuestionNode = {
  id: 'teknolojik_mi',
  question: 'Teknolojik bir cihaz  mi?',
  answers: {
    evet: iletisim_araci_mi,
    hayır: null, // Teknolojik değilse (insan yapımı ama teknolojik değil)
  },
};

const kiyafet_mi: QuestionNode = {
  id: 'kıyafet_mi',
  question: 'Bir kıyafet mi?',
  answers: {
    evet: null,
    hayır: {
      id: 'gunes_gozlugu_mi',
      question: 'Güneşten korunmak için takılan bir aksesuar mı?',
      answers: {
        evet: null, // Güneş Gözlüğü
        hayır: null, // Ayakkabı, takı vb.
      },
    },
  },
};

const giyilebilir_mi: QuestionNode = {
  id: 'giyilebilir_mi',
  question: 'Giyilebilir bir şey mi?',
  answers: {
    evet: kiyafet_mi,
    hayır: null,
  },
};

const hali_mi: QuestionNode = {
  id: 'hali_mi',
  question: 'Yerlere serilen, genellikle desenli bir tekstil ürünü mü?',
  answers: {
    evet: null, // Halı
    hayır: {
      id: 'perde_mi',
      question: 'Pencerelere asılan, kumaştan yapılmış bir ev eşyası mı?',
      answers: {
        evet: null, // Perde
        hayır: null, // Diğer ev dekorasyon eşyaları
      },
    },
  },
};

const kütüphane_mi: QuestionNode = {
  id: 'kutuphane_mi',
  question: 'Kitapların bulunduğu ve okuma yapılan bir bina mı?',
  answers: {
    evet: null, // Kütüphane
    hayır: {
      id: 'trafik_isiklari_mi',
      question: 'Trafikte araç ve yayaları düzenleyen, renkli ışıkları olan bir sistem mi?',
      answers: {
        evet: null, // Trafik Işıkları
        hayır: hali_mi, // Trafik ışıkları değilse halı/perde mi?
      },
    },
  },
};

const yatak_mi: QuestionNode = {
  id: 'yatak_mi',
  question: 'Üzerinde uyunan bir mobilya mı?',
  answers: {
    evet: null, // Yatak
    hayır: null, // Sehpa, komodin vb.
  },
};

const dolap_mi: QuestionNode = {
  id: 'dolap_mi',
  question: 'Eşya depolamak için kullanılan bir mobilya mı?',
  answers: {
    evet: null, // Dolap
    hayır: yatak_mi, // Dolap değilse yatak mı?
  },
};

const sandalye_mi: QuestionNode = {
  id: 'sandalye_mi',
  question: 'Oturmak için mi kullanılır?',
  answers: {
    evet: null, // Tahmin: Sandalye
    hayır: dolap_mi, // Sandalye değilse dolap/yatak mı?
  },
};

const masa_mi: QuestionNode = {
  id: 'masa_mi',
  question: 'Üzerine eşya koymak veya yemek yemek için mi kullanılır?',
  answers: {
    evet: null, // Tahmin: Masa
    hayır: sandalye_mi, // Masa değilse sandalye/dolap/yatak mı?
  },
};

const mobilya_mi: QuestionNode = {
  id: 'mobilya_mi',
  question: 'Mobilya mı?',
  answers: {
    evet: masa_mi, // Mobilya ise masa mı?
    hayır: { // Mobilya değilse
      id: 'tasit_mi',
      question: 'Bir taşıt mı?',
      answers: {
        evet: {
          id: 'araba_mi',
          question: 'Karada giden, motorlu ve tekerlekli bir taşıt mı?',
          answers: {
            evet: null, // Araba
            hayır: {
              id: 'tren_mi',
              question: 'Raylar üzerinde giden uzun bir taşıt mı?',
              answers: {
                evet: null, // Tren
                hayır: {
                  id: 'ucak_mi',
                  question: 'Havada seyahat eden bir taşıt mı?',
                  answers: {
                    evet: null, // Uçak
                    hayır: {
                      id: 'gemi_mi',
                      question: 'Denizde seyahat eden büyük bir taşıt mı?',
                      answers: {
                        evet: null, // Gemi
                        hayır: null, // Bisiklet, motosiklet vb.
                      },
                    },
                  },
                },
              },
            },
          },
        },
        hayır: kütüphane_mi, // Taşıt değilse kütüphane/trafik ışıkları/halı/perde mi?
      },
    },
  },
};

const insan_yapimi_mi: QuestionNode = {
  id: 'insan_yapimi_mi',
  question: 'İnsan yapımı bir şey mi?',
  answers: {
    evet: teknolojik_mi, // İlk olarak teknolojik mi?
    hayır: giyilebilir_mi, // Teknolojik değilse giyilebilir mi? (Buradan mobilya, taşıt vb. dallanır)
  },
};

// Doğal Cansız Dalları
const kaya_mi: QuestionNode = {
  id: 'kaya_mi',
  question: 'Bir kaya veya taş mı?',
  answers: {
    evet: null,
    hayır: {
      id: 'metal_mi',
      question: 'Bir maden veya metal mi (örneğin altın, demir)?',
      answers: {
        evet: null,
        hayır: null,
      },
    },
  },
};

const toprak_mi: QuestionNode = {
  id: 'toprak_mi',
  question: 'Toprak mı?',
  answers: {
    evet: null,
    hayır: {
      id: 'kristal_mi',
      question: 'Kristal, değerli taş gibi bir şey mi?',
      answers: {
        evet: null,
        hayır: null,
      },
    },
  },
};

const katilarin_ozellikleri: QuestionNode = {
  id: 'katilarin_ozellikleri',
  question: 'Bu şey sert ve dayanıklı mı?',
  answers: {
    evet: kaya_mi,
    hayır: toprak_mi,
  },
};

const kum_mi: QuestionNode = {
  id: 'kum_mi',
  question: 'Kum mu?',
  answers: {
    evet: null,
    hayır: {
      id: 'kil_mi',
      question: 'Kil veya benzeri toprak türü mü?',
      answers: {
        evet: null,
        hayır: null,
      },
    },
  },
};

const yumusak_madde_mi: QuestionNode = {
  id: 'yumusak_madde_mi',
  question: 'Yumuşak ve kolay dağılabilir bir madde mi?',
  answers: {
    evet: kum_mi,
    hayır: null,
  },
};

const katimi_sivi_mi: QuestionNode = {
  id: 'katimi_sivi_mi',
  question: 'Genellikle katı halde mi bulunur?',
  answers: {
    evet: katilarin_ozellikleri,
    hayır: null,
  },
};

const petrol_mi: QuestionNode = {
  id: 'petrol_mi',
  question: 'Petrol mü?',
  answers: {
    evet: null,
    hayır: {
      id: 'lav_mi',
      question: 'Lav mı?',
      answers: {
        evet: null,
        hayır: null,
      },
    },
  },
};

const dogal_sivi_mi: QuestionNode = {
  id: 'dogal_sivi_mi',
  question: 'Doğal olarak bulunan başka bir sıvı mı (örneğin lav, petrol)?',
  answers: {
    evet: petrol_mi,
    hayır: null,
  },
};

const su_mu: QuestionNode = {
  id: 'su_mu',
  question: 'Su mu?',
  answers: {
    evet: null,
    hayır: dogal_sivi_mi,
  },
};

const oksijen_mi: QuestionNode = {
  id: 'oksijen_mi',
  question: 'Oksijen mi?',
  answers: {
    evet: null,
    hayır: {
      id: 'karbondioksit_mi',
      question: 'Karbondioksit mi?',
      answers: {
        evet: null,
        hayır: null,
      },
    },
  },
};

const hava_gazlari_mi: QuestionNode = {
  id: 'hava_gazlari_mi',
  question: 'Hava veya doğada bulunan başka bir gaz mı?',
  answers: {
    evet: oksijen_mi,
    hayır: null,
  },
};

const ates_mi: QuestionNode = {
  id: 'ates_mi',
  question: 'Ateş mi?',
  answers: {
    evet: null,
    hayır: null,
  },
};

const plazma_yanar_mi: QuestionNode = {
  id: 'plazma_yanar_mi',
  question: 'Yanar, ışık veya ısı yayar mı? (örneğin ateş)',
  answers: {
    evet: ates_mi,
    hayır: null,
  },
};

const gaz_ozellik: QuestionNode = {
  id: 'gaz_ozellik',
  question: 'Gaz halinde mi?',
  answers: {
    evet: hava_gazlari_mi,
    hayır: plazma_yanar_mi,
  },
};

const sivi_gaz_ayrimi: QuestionNode = {
  id: 'sivi_gaz_ayrimi',
  question: 'Sıvı mı, gaz mı?',
  answers: {
    evet: su_mu,
    hayır: gaz_ozellik,
  },
};

const volkan_mi: QuestionNode = {
  id: 'volkan_mi',
  question: 'İçinden lav çıkan doğal bir dağ oluşumu mu?',
  answers: {
    evet: null, // Volkan
    hayır: {
      id: 'selale_mi',
      question: 'Suyun yüksek bir yerden aşağı aktığı doğal oluşum mu?',
      answers: {
        evet: null, // Şelale
        hayır: {
          id: 'gokkusagi_mi',
          question: 'Yağmur sonrası gökyüzünde beliren renkli bir kemer mi?',
          answers: {
            evet: null, // Gökkuşağı
            hayır: null, // Diğer doğal oluşumlar (dağ, tepe, göl vb.)
          },
        },
      },
    },
  },
};

const dogal_cansiz_mi: QuestionNode = {
  id: 'dogal_cansiz_mi',
  question: 'Doğada kendiliğinden mi oluşur?',
  answers: {
    evet: katimi_sivi_mi, // Katı mı, sıvı mı ayrımı
    hayır: volkan_mi, // Doğal cansız ve katı/sıvı/gaz değilse, volkan/şelale gibi oluşumlar mı?
  },
};

// --- Yiyecekler ve İçecekler (Yeni Ana Kategori) ---
const ekmek_mi: QuestionNode = {
  id: 'ekmek_mi',
  question: 'Genellikle un ve su ile yapılan, fırında pişirilen bir yiyecek mi?',
  answers: {
    evet: null, // Ekmek
    hayır: {
      id: 'peynir_mi',
      question: 'Sütten yapılan, farklı çeşitleri olan bir yiyecek mi?',
      answers: {
        evet: null, // Peynir
        hayır: {
          id: 'sut_mi',
          question: 'Memelilerden elde edilen, beyaz bir içecek mi?',
          answers: {
            evet: null, // Süt
            hayır: null, // Tereyağı, yoğurt gibi süt ürünleri
          },
        },
      },
    },
  },
};

const et_mi: QuestionNode = {
  id: 'et_mi',
  question: 'Hayvanlardan elde edilen bir yiyecek mi?',
  answers: {
    evet: {
      id: 'kofte_mi',
      question: 'Genellikle kıymadan yapılan, yuvarlak veya yassı şekilli bir yiyecek mi?',
      answers: {
        evet: null, // Köfte
        hayır: null, // Tavuk, balık vb.
      },
    },
    hayır: ekmek_mi, // Et değilse ekmek, peynir, süt gibi temel yiyecekler mi?
  },
};

const su_icecek_mi: QuestionNode = { // ID çakışmaması için değiştirdim
  id: 'su_icecek_mi',
  question: 'Renksiz, kokusuz, hayati önem taşıyan bir içecek mi?',
  answers: {
    evet: null, // Su
    hayır: {
      id: 'kola_mi',
      question: 'Gazlı, tatlı ve popüler bir içecek mi?',
      answers: {
        evet: null, // Kola
        hayır: null, // Meyve suyu, çay, kahve vb.
      },
    },
  },
};

const icecek_mi: QuestionNode = {
  id: 'icecek_mi',
  question: 'Sıvı halde tüketilen bir şey mi?',
  answers: {
    evet: su_icecek_mi, // İçecekse su mu, kola mı?
    hayır: et_mi, // İçecek değilse et, ekmek, peynir, süt mü?
  },
};

const domates_mi: QuestionNode = {
  id: 'domates_mi',
  question: 'Genellikle kırmızı renkte olan, hem meyve hem sebze olarak kullanılan bir yiyecek mi?',
  answers: {
    evet: {
      id: 'tahmin_domates',
      question: 'Tahminim: Domates. Doğru mu?',
      answers: {
        evet: null,
        hayır: null,
      },
    },
    hayır: {
      id: 'havuc_mu',
      question: 'Turuncu renkli, toprak altında büyüyen bir sebze mi?',
      answers: {
        evet: {
          id: 'tahmin_havuc',
          question: 'Tahminim: Havuç. Doğru mu?',
          answers: {
            evet: null,
            hayır: {
              id: 'sogan_patates_mi',
              question: 'O zaman düşündüğünüz şey soğan ya da patates olabilir mi?',
              answers: {
                evet: {
                  id: 'tahmin_sogan_patates',
                  question: 'Tahminim: Soğan veya patates. Doğru mu?',
                  answers: {
                    evet: null,
                    hayır: null,
                  },
                },
                hayır: {
                  id: 'tahmin_bilinmiyor',
                  question: 'Tahmin edemedim. Daha farklı bir sebze olabilir.',
                  answers: {
                    evet: null,
                    hayır: null,
                  },
                },
              },
            },
          },
        },
        hayır: {
          id: 'sogan_patates_mi',
          question: 'O zaman düşündüğünüz şey soğan ya da patates olabilir mi?',
          answers: {
            evet: {
              id: 'tahmin_sogan_patates',
              question: 'Tahminim: Soğan veya patates. Doğru mu?',
              answers: {
                evet: null,
                hayır: null,
              },
            },
            hayır: {
              id: 'tahmin_bilinmiyor',
              question: 'Tahmin edemedim. Daha farklı bir sebze olabilir.',
              answers: {
                evet: null,
                hayır: null,
              },
            },
          },
        },
      },
    },
  },
};

const   meyve_mi: QuestionNode = {
  id: 'meyve_mi',
  question: 'Genellikle çiğ olarak tüketilen tatlı veya ekşi bir bitki ürünü mü?',
  answers: {
    evet: {
      id: 'domates_mi',
      question: 'Domates midir?',
      answers: {
        evet: {
          id: 'tahmin_domates',
          question: 'Tahminim: Domates. Doğru mu?',
          answers: { evet: null, hayır: null },
        },
        hayır: {
          id: 'elma_mi',
          question: 'Elma mıdır?',
          answers: {
            evet: {
              id: 'tahmin_elma',
              question: 'Tahminim: Elma. Doğru mu?',
              answers: { evet: null, hayır: null },
            },
            hayır: {
              id: 'portakal_mi',
              question: 'Portakal mıdır?',
              answers: {
                evet: {
                  id: 'tahmin_portakal',
                  question: 'Tahminim: Portakal. Doğru mu?',
                  answers: { evet: null, hayır: null },
                },
                hayır: {
                  id: 'tahmin_bilinmiyor',
                  question: 'Tahmin edemedim, başka bir meyve olabilir mi?',
                  answers: { evet: null, hayır: null },
                },
              },
            },
          },
        },
      },
    },
    hayır: {
      id: 'kuruyemis_mi',
      question: 'Kabuklu ve genellikle kurutulmuş yenilebilir bir bitki ürünü mü?',
      answers: {
        evet: {
          id: 'fındık_mi',
          question: 'Fındık mıdır?',
          answers: {
            evet: {
              id: 'tahmin_findik',
              question: 'Tahminim: Fındık. Doğru mu?',
              answers: { evet: null, hayır: null },
            },
            hayır: {
              id: 'ceviz_mi',
              question: 'Ceviz midir?',
              answers: {
                evet: {
                  id: 'tahmin_ceviz',
                  question: 'Tahminim: Ceviz. Doğru mu?',
                  answers: { evet: null, hayır: null },
                },
                hayır: {
                  id: 'tahmin_bilinmiyor',
                  question: 'Tahmin edemedim, başka bir kuruyemiş olabilir mi?',
                  answers: { evet: null, hayır: null },
                },
              },
            },
          },
        },
        hayır: {
          id: 'ot_mi',
          question: 'Genellikle yemeklere aroma vermek için kullanılan bir ot veya baharat mıdır?',
          answers: {
            evet: {
              id: 'nane_mi',
              question: 'Nane midir?',
              answers: {
                evet: {
                  id: 'tahmin_nane',
                  question: 'Tahminim: Nane. Doğru mu?',
                  answers: { evet: null, hayır: null },
                },
                hayır: {
                  id: 'kekik_mi',
                  question: 'Kekik midir?',
                  answers: {
                    evet: {
                      id: 'tahmin_kekik',
                      question: 'Tahminim: Kekik. Doğru mu?',
                      answers: { evet: null, hayır: null },
                    },
                    hayır: {
                      id: 'tahmin_bilinmiyor',
                      question: 'Tahmin edemedim, başka bir ot veya baharat olabilir mi?',
                      answers: { evet: null, hayır: null },
                    },
                  },
                },
              },
            },
            hayır: {
              id: 'mantar_mi',
              question: 'Yenilebilir bir mantar mıdır?',
              answers: {
                evet: {
                  id: 'tahmin_mantar',
                  question: 'Tahminim: Mantar. Doğru mu?',
                  answers: { evet: null, hayır: null },
                },
                hayır: {
                  id: 'tahmin_bilinmiyor',
                  question: 'Tahmin edemedim, başka bir yenilebilir ürün olabilir mi?',
                  answers: { evet: null, hayır: null },
                },
              },
            },
          },
        },
      },
    },
  },
};

const sebze_mi: QuestionNode = {
  id: 'sebze_mi',
  question: 'Genellikle pişirilerek tüketilen bir bitki ürünü mü?',
  answers: {
    evet: domates_mi,
    hayır: meyve_mi,
  },
};




const elma_mi: QuestionNode = {
  id: 'elma_mi',
  question: 'Yuvarlak, farklı renklerde olabilen, ağaçta yetişen popüler bir meyve mi?',
  answers: {
    evet: null, // Elma
    hayır: {
      id: 'muz_mu',
      question: 'Sarı renkli, kabuğu soyulan, uzun bir meyve mi?',
      answers: {
        evet: null, // Muz
        hayır: null, // Portakal, çilek vb.
      },
    },
  },
};

const yenilebilir_mi: QuestionNode = {
  id: 'yenilebilir_mi',
  question: 'Yenilebilir bir şey mi?',
  answers: {
    evet: meyve_mi, 
    hayır: null, 
  },
};

// --- Yer İsimleri (Yeni Ana Kategori) ---
const nil_nehri_mi: QuestionNode = {
  id: 'nil_nehri_mi',
  question: 'Dünyanın en uzun nehirlerinden biri mi?',
  answers: {
    evet: null, // Nil Nehri
    hayır: null, // Amazon, Fırat vb.
  },
};

const nehir_mi: QuestionNode = {
  id: 'nehir_mi',
  question: 'Doğal bir akarsu yatağı mı?',
  answers: {
    evet: nil_nehri_mi, // Nehirlere örnek
    hayır: null, // Göl, deniz vb.
  },
};

const everest_mi: QuestionNode = {
  id: 'everest_mi',
  question: 'Dünyanın en yüksek dağı mı?',
  answers: {
    evet: null, // Everest
    hayır: null, // Ağrı Dağı, Fuji vb.
  },
};

const dag_mi: QuestionNode = {
  id: 'dag_mi',
  question: 'Yüksek ve doğal bir yeryüzü şekli mi?',
  answers: {
    evet: everest_mi, // Dağlara örnek
    hayır: nehir_mi, // Dağ değilse nehir mi?
  },
};

const pasifik_okyanusu_mu: QuestionNode = {
  id: 'pasifik_okyanusu_mu',
  question: 'Dünyanın en büyük okyanusu mu?',
  answers: {
    evet: null, // Pasifik Okyanusu
    hayır: null, // Atlantik, Hint Okyanusu vb.
  },
};

const okyanus_mi: QuestionNode = {
  id: 'okyanus_mi',
  question: 'Çok geniş ve derin bir su kütlesi mi?',
  answers: {
    evet: pasifik_okyanusu_mu, // Okyanus ise Pasifik mi?
    hayır: dag_mi, // Okyanus değilse dağ veya nehir mi?
  },
};

const asya_mi: QuestionNode = {
  id: 'asya_mi',
  question: 'Dünyanın en büyük kıtası mı?',
  answers: {
    evet: null, // Asya
    hayır: null, // Avrupa, Afrika vb.
  },
};

const kita_mi: QuestionNode = {
  id: 'kita_mi',
  question: 'Geniş bir kara parçası mı?',
  answers: {
    evet: asya_mi, // Kıta ise Asya mı?
    hayır: okyanus_mi, // Kıta değilse okyanus/dağ/nehir mi?
  },
};

const turkiye_mi: QuestionNode = {
  id: 'turkiye_mi',
  question: 'Hem Asya hem Avrupa kıtalarında toprakları olan bir ülke mi?',
  answers: {
    evet: null, // Türkiye
    hayır: null, // ABD, Almanya vb.
  },
};

const ulke_mi: QuestionNode = {
  id: 'ulke_mi',
  question: 'Siyasi bir sınırla belirlenmiş bir toprak parçası mı?',
  answers: {
    evet: turkiye_mi, // Ülkeyse Türkiye mi?
    hayır: kita_mi, // Ülke değilse kıta mı?
  },
};

const istanbul_mu: QuestionNode = {
  id: 'istanbul_mu',
  question: 'İki kıtayı birbirine bağlayan büyük bir şehir mi?',
  answers: {
    evet: null, // İstanbul
    hayır: {
      id: 'paris_mi',
      question: 'Eyfel Kulesi ile ünlü, Fransa\'nın başkenti mi?',
      answers: {
        evet: null, // Paris
        hayır: null, // Ankara, Londra vb.
      },
    },
  },
};

const sehir_mi: QuestionNode = {
  id: 'sehir_mi',
  question: 'Büyük ve kalabalık bir yerleşim yeri mi?',
  answers: {
    evet: istanbul_mu, // Şehir ise İstanbul mu, Paris mi?
    hayır: ulke_mi, // Şehir değilse ülke mi?
  },
};

const yer_ismi_mi: QuestionNode = {
  id: 'yer_ismi_mi',
  question: 'Bir yer adı veya coğrafi bir konum mu?',
  answers: {
    evet: sehir_mi, // Yer ismi ise şehir mi, ülke mi, kıta mı vb.?
    hayır: null, // Yer ismi değilse
  },
};

// --- Soyut Kavramlar Dalları ---

const mutluluk_benzeri_mi: QuestionNode = {
  id: 'mutluluk_benzeri_mi',
  question: 'Mutluluk, sevinç, huzur gibi bir şey mi?',
  answers: {
    evet: null, // Mutluluk
    hayır: {
      id: 'aska_benzer_mi',
      question: 'Aşka benzer bir duygu mu?',
      answers: {
        evet: null, // Aşk
        hayır: {
          id: 'umut_mu',
          question: 'Geleceğe dair iyi beklentileri içeren bir duygu mu?',
          answers: {
            evet: null, // Umut
            hayır: {
              id: 'merak_mi',
              question: 'Bilme veya öğrenme isteği uyandıran bir duygu mu?',
              answers: {
                evet: null, // Merak
                hayır: null, // Minnet, hayranlık vb.
              },
            },
          },
        },
      },
    },
  },
};

const korku_mu: QuestionNode = {
  id: 'korku_mu',
  question: 'Korku mu?',
  answers: {
    evet: null,
    hayır: {
      id: 'uzuntu_mu',
      question: 'Üzüntü mü?',
      answers: {
        evet: null,
        hayır: null, // Öfke, hayal kırıklığı vb.
      },
    },
  },
};

const korku_benzeri_mi: QuestionNode = {
  id: 'korku_benzeri_mi',
  question: 'Korku, öfke veya üzüntü gibi olumsuz bir duygu mu?',
  answers: {
    evet: korku_mu,
    hayır: {
      id: 'sabir_mi',
      question: 'Beklemeyi veya zorluklara dayanmayı gerektiren bir erdem mi?',
      answers: {
        evet: null, // Sabır
        hayır: null, // Nötr duygular (şaşkınlık gibi)
      },
    },
  },
};

const olumlu_mu: QuestionNode = {
  id: 'olumlu_mu',
  question: 'Genellikle olumlu bir duygu mu?',
  answers: {
    evet: mutluluk_benzeri_mi,
    hayır: korku_benzeri_mi,
  },
};

const duygu_mu: QuestionNode = {
  id: 'duygu_mu',
  question: 'Bu bir duygu mu?',
  answers: {
    evet: olumlu_mu,
    hayır: null, // Duygu değilse kavram veya düşünce
  },
};

const adalet_mi_kavram: QuestionNode = {
  id: 'adalet_mi_kavram',
  question: 'Hak ve eşitlikle ilgili bir kavram mı?',
  answers: {
    evet: null, // Adalet
    hayır: {
      id: 'ozgurluk_mu_kavram',
      question: 'Bağımsızlık ve kısıtlamasız olma durumuyla ilgili bir kavram mı?',
      answers: {
        evet: null, // Özgürlük
        hayır: null, // Barış, hoşgörü vb.
      },
    },
  },
};

const sorumluluk_mu: QuestionNode = {
  id: 'sorumluluk_mu',
  question: 'Bir görevi yerine getirme veya bir eylemin sonuçlarını üstlenme durumu mu?',
  answers: {
    evet: null, // Sorumluluk
    hayır: adalet_mi_kavram, // Sorumluluk değilse adalet/özgürlük mü?
  },
};



const dusunce_mi: QuestionNode = {
  id: 'dusunce_mi',
  question: 'Zihinde oluşan bir fikir veya soyut bir kavram mı?',
  answers: {
    evet: null, // Düşünce
    hayır: {
      id: 'hayal_mi',
      question: 'Gerçek olmayan, zihinde canlandırılan bir şey mi?',
      answers: {
        evet: null, // Hayal
        hayır: null, // Bilinç, hafıza vb.
      },
    },
  },
};

const bilgi_mi: QuestionNode = {
  id: 'bilgi_mi',
  question: 'Bilgi mi?',
  answers: {
    evet: null,
    hayır: {
      id: 'zeka_mi',
      question: 'Zekâ mı?',
      answers: {
        evet: null,
        hayır: {
          id: 'yaraticilik_mi',
          question: 'Yeni ve özgün fikirler üretme yeteneği mi?',
          answers: {
            evet: null, // Yaratıcılık
            hayır: dusunce_mi, // Yaratıcılık değilse düşünce/hayal mi?
          },
        },
      },
    },
  },
};

const gecmis_gelecek_mi: QuestionNode = {
  id: 'gecmis_gelecek_mi',
  question: 'Geçmiş veya gelecek gibi bir kavram mı?',
  answers: {
    evet: null,
    hayır: {
      id: 'an_mi',
      question: 'Anı temsil eden bir kavram mı?',
      answers: {
        evet: null,
        hayır: null,
      },
    },
  },
};

const zaman_kavrami_mi: QuestionNode = {
  id: 'zaman_kavrami_mi',
  question: 'Zamanla ilgili bir kavram mı?',
  answers: {
    evet: gecmis_gelecek_mi,
    hayır: null,
  },
};

const bilinissel_mi: QuestionNode = {
  id: 'bilinissel_mi',
  question: 'Zihinle, bilgiyle veya bilinçle ilgili bir şey mi?',
  answers: {
    evet: bilgi_mi,
    hayır: zaman_kavrami_mi,
  },
};

const batmanNode: QuestionNode = {
  id: 'batman_mi',
  question: 'Gotham şehrinde yaşayan, maskeli bir kahraman mı?',
  answers: {
    evet: null,
    hayır: null,
  },
};

const kurgusal_karakter_mi: QuestionNode = {
  id: 'kurgusal_karakter_mi',
  question: 'Kitaplardan, filmlerden veya çizgi filmlerden bilinen kurgusal bir karakter mi?',
  answers: {
    evet: {
      id: 'harry_potter_mi',
      question: 'Büyücü, gözlüklü, sihir dünyasında yaşayan ünlü bir karakter mi?',
      answers: {
        evet: null, // Harry Potter
        hayır: {
          id: 'darth_vader_mi',
          question: 'Karanlık tarafta olan, siyah giyinen, maskeli bir karakter mi?',
          answers: {
            evet: null, // Darth Vader
            hayır: {
              id: 'sherlock_holmes_mi',
              question: 'Ünlü bir dedektif, zekasıyla olayları çözen bir karakter mi?',
              answers: {
                evet: null, // Sherlock Holmes
                hayır: {
                  id: 'sunger_bob_mi',
                  question: 'Denizde yaşayan, sarı renkli, neşeli bir çizgi film karakteri mi?',
                  answers: {
                    evet: null, // Sünger Bob
                    hayır: {
                      id: 'batman_mi',
                      question: 'Gotham şehrinde yaşayan, maskeli ve zengin bir kahraman mı?',
  answers: {
    evet: null,  
    hayır: null,
  },
                    }  // Batman buraya bağlandı
                  },
                },
              },
            },
          },
        },
      },
    },
    hayır: null, // Kurgusal değilse
  },
};

const toplumsal_kavram_mi: QuestionNode = {
  id: 'toplumsal_kavram_mi',
  question: 'Toplumsal bir değer veya fikir mi?',
  answers: {
    evet: sorumluluk_mu,
    hayır: kurgusal_karakter_mi, // Toplumsal değilse bilişsel veya zamanla ilgili
  },
};
const soyut_kavram_mi: QuestionNode = {
  id: 'soyut_kavram_mi',
  question: 'Bir duygu, kavram veya soyut bir düşünce mi?',
  answers: {
    evet: duygu_mu,
    hayır: toplumsal_kavram_mi, // Duygu değilse toplumsal veya bilişsel
  },
};


// --- Ana Soru Ağacı Başlangıcı ---
export const QUESTION_TREE: QuestionNode = {
  id: 'canli_mi',
  question: 'Aklınızdaki şey **canlı bir varlık** mı?',
  answers: {
    evet: { // Canlı ise
      id: 'hayvan_mi',
      question: 'Bir **hayvan** mı?',
      answers: {
        evet: kac_bacakli, // Hayvansa kaç bacaklı? (tuylu_mu, iki_bacakli_mi, surungen_mi vb.)
        hayır: bitki_mi, // Hayvan değilse bitki mi? (agac_mi, cicek_mi, mantar_mi, mercan_mi vb.)
      },
    },
    hayır: { // Cansız ise
      id: 'insan_yapimi_mi_ana',
      question: 'İnsan yapımı ve teknolojik bir şey mi?',
      answers: {
        evet: teknolojik_mi, // İnsan yapımı ve teknolojik mi? (cep_telefonu_mu, laptop_mu vb.)
        hayır: { // İnsan yapımı ama teknolojik değilse
          id: 'giyilebilir_mi_ana',
          question: 'Giyilebilir bir şey mi?',
          answers: {
            evet: kiyafet_mi, // Giyilebilir ise kıyafet mi, güneş gözlüğü mü?
            hayır: { // Giyilebilir değilse
              id: 'mobilya_mi_ana',
              question: 'Mobilya mı?', // Yeni mobilya dallanmasına yönlendir
              answers: {
                evet: masa_mi, // Masa mı, sandalye mi, dolap mı?
                hayır: { // Mobilya değilse
                  id: 'tasit_mi_ana',
                  question: 'Bir taşıt mı?',
                  answers: {
                    evet: mobilya_mi.answers.hayır?.answers.evet as QuestionNode, // Taşıt dallanmasını kullan
                    hayır: { // Taşıt değilse
                      id: 'yenilebilir_mi_ana',
                      question: 'Yenilebilir bir şey mi?', // Yeni Yiyecekler/İçecekler kategorisi
                      answers: {
                        evet: yenilebilir_mi, // Meyve, sebze, içecek vb.
                        hayır: { // Yenilebilir değilse
                          id: 'yer_ismi_mi_ana',
                          question: 'Bir yer adı veya coğrafi bir konum mu?', // Yeni Yer İsimleri kategorisi
                          answers: {
                            evet: yer_ismi_mi, // Şehir, ülke, dağ, nehir vb.
                            hayır: { // Yer ismi değilse
                              id: 'dogal_cansiz_mi_ana',
                              question: 'Doğada kendiliğinden mi oluşur?', // Doğal cansızlar
                              answers: {
                                evet: dogal_cansiz_mi, // Kaya, su, ateş vb.
                                hayır: soyut_kavram_mi, // Doğal da değilse soyut kavramlar
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};