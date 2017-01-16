#include "pebble_process_info.h"
#include "src/resource_ids.auto.h"

const PebbleProcessInfo __pbl_app_info __attribute__ ((section (".pbl_header"))) = {
  .header = "PBLAPP",
  .struct_version = { PROCESS_INFO_CURRENT_STRUCT_VERSION_MAJOR, PROCESS_INFO_CURRENT_STRUCT_VERSION_MINOR },
  .sdk_version = { PROCESS_INFO_CURRENT_SDK_VERSION_MAJOR, PROCESS_INFO_CURRENT_SDK_VERSION_MINOR },
  .process_version = { 1, 2 },
  .load_size = 0xb6b6,
  .offset = 0xb6b6b6b6,
  .crc = 0xb6b6b6b6,
  .name = "GoPro Remote",
  .company = "Konrad Iturbe",
  .icon_resource_id = RESOURCE_ID_IMAGES_APP_ICON,
  .sym_table_addr = 0xA7A7A7A7,
  .flags = PROCESS_INFO_PLATFORM_DIORITE,
  .num_reloc_entries = 0xdeadcafe,
  .uuid = { 0xF9, 0x96, 0x3D, 0xC0, 0x43, 0x0A, 0x4E, 0xE7, 0x88, 0x14, 0xEE, 0x4A, 0xB4, 0xBD, 0x92, 0x06 },
  .virtual_size = 0xb6b6
};
