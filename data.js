// 八个地标共用这一份数据。只修改对应编号对象，页面会自动同步。
// TODO_MEMBER_CONTENT：基础信息、标题、简介、故事、感悟、关键词。
// TODO_IMAGE：images 填相对路径，如 images/01/cover.jpg；image_captions 填图片说明。
// TODO_SOURCE：sources 至少两项 {name:"资料名称",publisher:"发布机构",url:"https://..."}。
// TODO_MAP_POSITION：map_position 为800×660示意画布中的x/y，不是经纬度。
const sites = [
  {
    "id": "01",
    "collector": "张滢琳",
    "site_name": "中国共产党第一次全国代表大会纪念馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 422,
      "y": 389
    }
  },
  {
    "id": "02",
    "collector": "潘泺棂",
    "site_name": "中国社会主义青年团中央机关旧址纪念馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 362,
      "y": 422
    }
  },
  {
    "id": "03",
    "collector": "缪亦秋",
    "site_name": "中共二大会址纪念馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 352,
      "y": 353
    }
  },
  {
    "id": "04",
    "collector": "王韵清",
    "site_name": "上海四行仓库抗战纪念馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 404,
      "y": 294
    }
  },
  {
    "id": "05",
    "collector": "庄晨艺",
    "site_name": "中共四大纪念馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 477,
      "y": 237
    }
  },
  {
    "id": "06",
    "collector": "童思妤",
    "site_name": "沪西工人半日学校史料陈列馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 252,
      "y": 297
    }
  },
  {
    "id": "07",
    "collector": "谭钧译",
    "site_name": "龙华烈士纪念馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 322,
      "y": 498
    }
  },
  {
    "id": "08",
    "collector": "冯绎帆",
    "site_name": "上海国歌展示馆",
    "district": "",
    "address": "",
    "collection_type": "",
    "collection_date": "",
    "theme": "",
    "tagline": "",
    "summary": "",
    "story": "",
    "student_note": "",
    "keywords": [],
    "images": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "image_captions": {
      "cover": "",
      "building": "",
      "detail": "",
      "visit": ""
    },
    "sources": [],
    "map_position": {
      "x": 553,
      "y": 302
    }
  }
];
